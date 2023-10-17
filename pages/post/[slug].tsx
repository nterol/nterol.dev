import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

import { ArticleBody } from '@/components/organisms/Article';
import { type ArticleWithMDX } from '@/components/organisms/Article/types';
import { AsideContainer } from '@/components/organisms/desktop/aside';
import PageLayout from '@/components/templates/page-layout';
import { getArticlesPath } from '@/utils/extract';
import client from 'apollo-client';
import { articleContent, getArticlePaths } from 'graphql/articles/queries';
import type {
  ArticleContentQuery,
  ArticleContentQueryVariables,
  GetArticlePathsQuery,
  GetArticlePathsQueryVariables,
} from 'graphql/types';

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rehypePlugins: [rehypeHighlight],
    },
  });

  return { props: { article: { ...data.article, content } }, revalidate: 24 * 3600 };
};

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<PageParams>> => {
  const { data } = await client.query<GetArticlePathsQuery, GetArticlePathsQueryVariables>({ query: getArticlePaths });

  return {
    paths: getArticlesPath(data.allArticles),
    fallback: 'blocking',
  };
};

export default function PostPage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: article.title ?? 'A post by nterol',
        description: article.description ?? '',
        imagePath: '',
      }}
    >
      <main className="p-2 pb-[80px] flex flex-col gap-8 relative md:items-center">
        <AsideContainer />
        <ArticleBody article={article} />
      </main>
    </PageLayout>
  );
}
