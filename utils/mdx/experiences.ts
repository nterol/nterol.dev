import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Locale } from "@custom-types/posts";
import getStacks from "../stacks";

const EXP_PATH_LOCALE = (locale: Locale) =>
  join(process.cwd(), `_experiences/${locale}`);
const EXP_PATH = join(process.cwd(), `_experiences`);

function getFilePaths(locale: Locale): string[] {
  return fs
    .readdirSync(locale ? EXP_PATH_LOCALE(locale) : EXP_PATH)
    .filter((path) => /\.mdx?$/.test(path));
}

function getExperienceItem(path: string) {
  const fullPath = join(EXP_PATH, path);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  const { stack } = data;
  const fullStack = stack.map((tech: string) => getStacks.get(tech) ?? tech);

  console.log(fullStack);

  return { data: { ...data, stack: fullStack }, content };
}

export function getExperiences(locale: Locale) {
  const filePaths = getFilePaths(locale);

  const experiences = filePaths.map((filePath) =>
    getExperienceItem(`${locale}/${filePath}`)
  );

  return experiences;
}
