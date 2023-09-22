import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

import PageLayout from '@/components/templates/page-layout';
import { articleContent, getArticlePaths } from '@/graphql/articles/queries';
import {
  ArticleContentQuery,
  ArticleContentQueryVariables,
  GetArticlePathsQuery,
  GetArticlePathsQueryVariables,
} from '@/graphql/types';
import { getArticlesPath } from '@/utils/extract';
import client from 'apollo-client';

type Props = {
  article: Omit<NonNullable<ArticleContentQuery['article']>, 'content'> & {
    content: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
  };
};

type PageParams = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, PageParams> = async ({ params }) => {
  if (!params?.slug)
    return {
      notFound: true,
    };
  const { data } = await client.query<ArticleContentQuery, ArticleContentQueryVariables>({
    query: articleContent,
    variables: { slug: params?.slug },
  });

  if (!data.article?.content) {
    return { notFound: true };
  }

  const content = await serialize(data.article.content, {
    mdxOptions: {
      // @ts-ignore
      rehypePlugins: [rehypeHighlight],
    },
  });

  return { props: { article: { ...data.article, content } } };
};

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<PageParams>> => {
  const { data } = await client.query<GetArticlePathsQuery, GetArticlePathsQueryVariables>({ query: getArticlePaths });

  return {
    paths: getArticlesPath(data.allArticles),
    fallback: 'blocking',
  };
};

export default function MobilePostPage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: article.title ?? 'A post by nterol',
        description: article.description ?? '',
        imagePath: '',
      }}
    >
      <main></main>
    </PageLayout>
  );
}
