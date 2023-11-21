import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import client from '@/apollo-client';
import { PatternBackground } from '@/components/molecules/pattern-background';
import { FrontPageLayout } from '@/components/templates/front-page';
import PageLayout from '@/components/templates/page-layout';
import { frontPageQuery } from '@/graphql/cms/frontpage/queries';
import type { FrontPageQuery, FrontPageQueryVariables, SiteLocale } from '@/graphql/cms/types';
import { serializeContent } from '@/utils/serialize-content';
import { MDXContent } from '@/utils/type';

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale = 'fr' }) => {
  const { data } = await client.query<FrontPageQuery, FrontPageQueryVariables>({
    query: frontPageQuery,
    variables: { locale: locale as SiteLocale },
  });

  const { allArticles: articles, about, allQuizzs, allBreves } = data;

  if (!about) return { notFound: true };
  const bio = about.description ? await serialize(about.description) : null;

  const [quizzes, breves] = await Promise.all([allQuizzs, allBreves].map(async (item) => await serializeContent(item)));

  return {
    props: {
      bio,
      quizzes: quizzes.filter((q): q is MDXContent => !!q.content),
      breves: breves.filter((breve): breve is MDXContent => !!breve.content),
      articles,
      locale,
    },
  };
};

type HomeProps = {
  articles: FrontPageQuery['allArticles'];
  bio: MDXRemoteSerializeResult | null;
  quizzes: MDXContent[];
  breves: MDXContent[];
  locale: string;
};

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: 'Nicolas Terol',
        description: 'I make posts about frontend tech I use and love !',
        imagePath: '',
      }}
    >
      <PatternBackground />
      <FrontPageLayout {...props} />
    </PageLayout>
  );
}
