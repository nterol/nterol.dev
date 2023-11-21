import { useHydrateAtoms } from 'jotai/utils';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

import { TranslationsBar } from '@/components/molecules/translations-bar';
import { ArticleBody } from '@/components/organisms/Article';
import { BottomContainer } from '@/components/organisms/aside';
import PageLayout from '@/components/templates/page-layout';
import { articleContent, getArticlePaths } from '@/graphql/cms/articles/queries';
import {
  ArticleContentQuery,
  ArticleContentQueryVariables,
  GetArticlePathsQuery,
  GetArticlePathsQueryVariables,
  SiteLocale,
} from '@/graphql/cms/types';
import { IsSideNote } from '@/store/aside-note';
import { getArticlesPath } from '@/utils/extract';
import { ArticleWithMDX, TranslationURL } from '@/utils/types';
import client from 'apollo-client';

type Props = {
  article: ArticleWithMDX;
  translations: TranslationURL[] | undefined;
};

type PageParams = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, PageParams> = async ({ locale, params }) => {
  if (!params?.slug)
    return {
      notFound: true,
    };
  const { data } = await client.query<ArticleContentQuery, ArticleContentQueryVariables>({
    query: articleContent,
    variables: { slug: params?.slug, locale: locale as SiteLocale },
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
  const translations = data.allArticles[0]._allSlugLocales
    ?.filter((t) => t.locale !== locale)
    .filter((tt): tt is TranslationURL => !!tt);

  return { props: { translations, article: { ...data.article, content } } };
};

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<PageParams>> => {
  const { data } = await client.query<GetArticlePathsQuery, GetArticlePathsQueryVariables>({ query: getArticlePaths });

  return {
    paths: getArticlesPath(data.allArticles),
    fallback: 'blocking',
  };
};

export default function MobilePostPage({ article, translations }: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <TranslationsBar translations={translations} />
        <ArticleBody article={article} />
      </main>
      <BottomContainer />
    </PageLayout>
  );
}
