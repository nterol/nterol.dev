import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const ABOUT_PATH = join(process.cwd(), "_about");

const withLocale = (locale: string) => `${ABOUT_PATH}/${locale}`;

export function getBio(locale: string) {
  const bioPath = join(withLocale(locale), "bio.mdx");
  const bioContent = fs.readFileSync(bioPath, "utf8");
  const { data, content } = matter(bioContent);

  return { data, content };
}
