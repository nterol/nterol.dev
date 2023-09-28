import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { ArticleContentQuery } from '@/graphql/types';

export type ArticleWithMDX = Omit<NonNullable<ArticleContentQuery['article']>, 'content'> & {
  content: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
};
