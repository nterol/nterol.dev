import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import type { ArticleContentQuery, SiteLocale } from '@/graphql/cms/types';

export type ArticleWithMDX = Omit<NonNullable<ArticleContentQuery['article']>, 'content'> & {
  content: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
};

export type TranslationURL = {
  __typename: 'StringMultiLocaleField';
  value?: string | null | undefined;
  locale?: SiteLocale | null | undefined;
};
