import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

import type { IPost, Post } from "@custom-types/posts";

const POSTS_PATH_LOCALE = (locale: string) =>
  join(process.cwd(), `_posts/${locale}`);

const POSTS_PATH = join(process.cwd(), `_posts`);

function getPostFilePaths(locale: string): string[] {
  return fs
    .readdirSync(locale ? POSTS_PATH_LOCALE(locale) : POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path));
}

export function getPost(slug: string): Post {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content } as Post;
}

export function getPostItems(
  filePath: string,
  fields: Array<keyof IPost>
): IPost {
  const slug = filePath.replace(/\.mdx?$/, "");

  const { data, content } = getPost(slug);

  const items: IPost = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    } else if (field === "content") {
      items[field] = content;
    } else if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(
  locale: string,
  fields: Array<keyof IPost>
): IPost[] {
  const filePaths = getPostFilePaths(locale);

  const posts = filePaths.map((filePath) =>
    getPostItems(`${locale}/${filePath}`, fields)
  );

  console.log("COMPLETE 🧩", posts);

  return posts;
}
