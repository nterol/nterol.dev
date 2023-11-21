import { type MDXRemoteSerializeResult } from 'next-mdx-remote';

export type MDXContent = { content: MDXRemoteSerializeResult; id: string; __typename: string };
