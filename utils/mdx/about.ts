import fs from 'fs';
import { join} from 'path';
import matter from "gray-matter";

const ABOUT_PATH = join(process.cwd(), "_about");

export function getBio() {
    const bioPath = join(ABOUT_PATH, "bio.mdx");
    const bioContent = fs.readFileSync(bioPath, "utf8");
    const {data, content}= matter(bioContent);

    console.log(data);
    console.log(content);
    return {data, content};
}