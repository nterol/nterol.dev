export type Items = Record<string, string>;

export type Post = {
  data: Record<string, string>;
  content: string;
};

export interface IPost {
  slug: string;
  date: string;
  thumbnail: string;
  title: string;
  description: string;
  directions: string[];
}

export type Locale = "fr" | "en-US";
