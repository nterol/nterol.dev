import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Locale } from "@custom-types/posts";

const ABOUT_PATH = join(process.cwd(), "_about");

const withLocale = (locale: Locale) =>`${ABOUT_PATH}/${locale}`

export function getBio(locale: Locale) {
  const bioPath = join(withLocale(locale), "bio.mdx");
  const bioContent = fs.readFileSync(bioPath, "utf8");
  const { data, content } = matter(bioContent);

  return { data, content };
}
