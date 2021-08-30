import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

import type { IPost, Items, Locale, Post } from "@custom-types/posts";

const POSTS_PATH_LOCALE = (locale: Locale) =>
  join(process.cwd(), `_posts/${locale}`);

const POSTS_PATH = join(process.cwd(), `_posts`);

function getPostFilePaths(locale: Locale): string[] {
  return fs
    .readdirSync(POSTS_PATH_LOCALE(locale))
    .filter((path) => /\.mdx?$/.test(path));
}

export function getPost(slug: string): Post {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content };
}

export function getPostItems(filePath: string, fields: string[] = []): IPost {
  const slug = filePath.replace(/\.mdx?$/, "");
  const { data, content } = getPost(slug);

  /* This sucks */
  const items: Items = {};
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = "slug"; 
    }

    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });  

  return items;
}

export function getAllPosts(
  locale: Locale = "fr",
  fields: string[] = []
): IPost[] {
  const filePaths = getPostFilePaths(locale);

  const posts = filePaths.map((filePath) =>
    getPostItems(`${locale}/${filePath}`, fields)
  );

  return posts;
}
