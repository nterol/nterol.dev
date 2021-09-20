export type Matter = {
  slug: string;
  date: string;
  thumbnail: string;
  title: string;
  description: string;
};
export type Post = {
  data: Matter;
  content: string;
};

export type IPost = {
  slug?: string;
  content?: string;
  date?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
};
