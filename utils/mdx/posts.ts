import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

import type { Items, Post } from "@custom-types/posts";


// type Items = Record<string, string>;

// type Post = {
//   data: Record<string, string>;
//   content: string;
// };

const POSTS_PATH = join(process.cwd(), "_posts");

function getPostFilePaths(): string[] {
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
}

export function getPost(slug: string): Post {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content };
}

export function getPostItems(filePath: string, fields: string[] = []): Items {
  const slug = filePath.replace(/\.mdx?$/, "");
  const { data, content } = getPost(slug);
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

export function getAllPosts(fields: string[] = []): Items[] {
  const filePaths = getPostFilePaths();
  const posts = filePaths.map((filePath) => getPostItems(filePath, fields));

  return posts;
}
