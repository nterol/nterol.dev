import { useHydrateAtoms } from 'jotai/utils';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

import { ArticleBody } from '@/components/organisms/Article';
import { ArticleWithMDX } from '@/components/organisms/Article/types';
import { BottomContainer } from '@/components/organisms/aside';
import PageLayout from '@/components/templates/page-layout';
import { articleContent, getArticlePaths } from '@/graphql/cms/articles/queries';
import {
  ArticleContentQuery,
  ArticleContentQueryVariables,
  GetArticlePathsQuery,
  GetArticlePathsQueryVariables,
} from '@/graphql/cms/types';
import { IsSideNote } from '@/store/aside-note';
import { getArticlesPath } from '@/utils/extract';
import client from 'apollo-client';

type Props = {
  article: ArticleWithMDX;
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
  useHydrateAtoms([[IsSideNote, false]]);
  return (
    <PageLayout
      meta={{
        pageTitle: article.title ?? 'A post by nterol',
        description: article.description ?? '',
        imagePath: '',
      }}
    >
      <main className="min-h-screen p-3 pb-[80px] flex flex-col gap-8 relative md:items-center">
        <ArticleBody article={article} />
      </main>
      <BottomContainer />
    </PageLayout>
  );
}
