import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

import client from '@/apollo-client';
import { PatternBackground } from '@/components/molecules/pattern-background';
import { FrontPageLayout } from '@/components/templates/front-page';
import PageLayout from '@/components/templates/page-layout';
import { frontPageQuery } from '@/graphql/cms/frontpage/queries';
import type { FrontPageQuery, FrontPageQueryVariables, SiteLocale } from '@/graphql/cms/types';
import { UncertainMDX } from '@/utils/type';

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale = 'fr' }) => {
  const { data } = await client.query<FrontPageQuery, FrontPageQueryVariables>({
    query: frontPageQuery,
    variables: { locale: locale as SiteLocale },
  });

  const { allArticles: articles, about, allQuizzs } = data;

  if (!about) return { notFound: true };
  const bio = about.description ? await serialize(about.description) : null;
  const quizzes = await Promise.all(
    allQuizzs.map(async (item) => {
      const content = item.content
        ? await serialize(item.content, {
            mdxOptions: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              rehypePlugins: [rehypeHighlight],
            },
          })
        : null;
      return {
        ...item,
        content,
      };
    }),
  );

  return {
    props: {
      bio,
      quizzes,
      articles,
      locale,
    },
  };
};

type HomeProps = {
  articles: FrontPageQuery['allArticles'];
  bio: UncertainMDX;
  quizzes: { content: UncertainMDX; id: string }[];
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
