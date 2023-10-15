import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

import client from '@/apollo-client';
import { AnchorTitle } from '@/components/molecules/anchor-title';
import { PatternBackground } from '@/components/molecules/pattern-background';
import { ArticleDescription } from '@/components/organisms/article-description';
import { ContactGrid } from '@/components/organisms/contact-grid';
import { PresentationSection } from '@/components/organisms/presentation-section';
import PageLayout from '@/components/templates/page-layout';
import s from '@/components/templates/page-layout/page-layout.module.css';
import { frontPageQuery } from '@/graphql/cms/frontpage/queries';
import { FrontPageQuery, FrontPageQueryVariables, SiteLocale } from '@/graphql/cms/types';

type UncertainMDX = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>> | null;

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

export default function Home({ articles, bio, locale }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: 'Nicolas Terol',
        description: 'I make posts about frontend tech I use and love !',
        imagePath: '',
      }}
    >
      <PatternBackground />
      <main className={`${s.main} md:p-2 flex flex-col gap-8`}>
        <section className="flex flex-col justify-center py-16 lg:py-24">
          <div className="prose md:max-w-[50vw] lg:max-w-[45vw]">
            <PresentationSection />
            {bio ? (
              <div className="font-bold lg:text-xl text-black">
                <MDXRemote {...bio} />
              </div>
            ) : null}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <AnchorTitle title="articles" />

          {articles?.map((article) => (
            <ArticleDescription key={article.slug} article={article} locale={locale} />
          ))}
        </section>
        <section>
          <AnchorTitle title="contact" />
          <ContactGrid />
        </section>
      </main>
    </PageLayout>
  );
}
