import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

import { ArticleCore } from '@/components/templates/article-core';
import PageLayout from '@/components/templates/page-layout';
import { articleContent, getArticlePaths } from '@/graphql/cms/articles/queries';
import {
  SiteLocale,
  type ArticleContentQuery,
  type ArticleContentQueryVariables,
  type GetArticlePathsQuery,
  type GetArticlePathsQueryVariables,
} from '@/graphql/cms/types';
import { getArticlesPath } from '@/utils/extract';
import type { ArticleWithMDX, TranslationURL } from '@/utils/types';
import client from 'apollo-client';

export type ArticlePageProps = {
  translations: TranslationURL[] | undefined;
  article: ArticleWithMDX;
};

type PageParams = {
  slug: string;
};

export const getStaticProps: GetStaticProps<ArticlePageProps, PageParams> = async ({ params, locale = 'fr' }) => {
  if (!params?.slug)
    return {
      notFound: true,
    };
  const { data } = await client.query<ArticleContentQuery, ArticleContentQueryVariables>({
    query: articleContent,
    variables: { slug: params?.slug, locale: locale as SiteLocale },
  });

  if (!data.article || !data.article?.content) {
    return { notFound: true };
  }
  const content = await serialize(data.article.content, {
    mdxOptions: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rehypePlugins: [rehypeHighlight],
    },
  });

  const translations = data.allArticles[0]._allSlugLocales
    ?.filter((t) => t.locale !== locale)
    .filter((tt): tt is TranslationURL => !!tt);

  return { props: { translations, article: { ...data.article, content } }, revalidate: 24 * 3600 };
};

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<PageParams>> => {
  const { data } = await client.query<GetArticlePathsQuery, GetArticlePathsQueryVariables>({ query: getArticlePaths });

  return {
    paths: getArticlesPath(data.allArticles),
    fallback: 'blocking',
  };
};

export default function ArticlePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: props.article.title ?? 'A post by nterol',
        description: props.article.description ?? '',
        imagePath: '',
      }}
    >
      <ArticleCore {...props} />
    </PageLayout>
  );
}
