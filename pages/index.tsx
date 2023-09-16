import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";

import client from "@/apollo-client";

import Masonry from "@/components/atoms/masonry";

import {
  PresentationSection,
  Bio,
} from "@/components/organisms/presentation-section";
import PostCard from "@/components/organisms/post-card";
import PageLayout from "@/components/templates/page-layout";

import styles from "../styles/Home.module.css";
import {
  FrontPageQuery,
  FrontPageQueryVariables,
  SiteLocale,
} from "@/graphql/types";

import s from "@/components/templates/page-layout/page-layout.module.css";
import { frontPageQuery } from "@/graphql/frontpage/queries";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type UncertainMDX = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
> | null;

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  locale = "fr",
}) => {
  const { data } = await client.query<FrontPageQuery, FrontPageQueryVariables>({
    query: frontPageQuery,
    variables: { locale: locale as SiteLocale },
  });

  const { allArticles: articles, about, allQuizzs: quizzes } = data;

  if (!about) return { notFound: true };

  const { vitrine, description } = about;
  const [vitrineContent, descriptionContent, ...quizzesContent] =
    await Promise.all(
      [{ content: vitrine }, { content: description }, ...quizzes].map(
        async (mdx) => (mdx.content ? await serialize(mdx.content) : null)
      )
    );

  return {
    props: {
      bio: descriptionContent,
      vitrine: vitrineContent,
      quizzes: quizzesContent,
      articles,
    },
  };
};

type HomeProps = {
  articles: FrontPageQuery["allArticles"];
  vitrine: UncertainMDX;
  bio: UncertainMDX;
  quizzes: UncertainMDX[];
};

const colors = ["#8bd3dd", "#F9F871"];

export default function Home({
  articles,
  bio,
}: // bioSource,
InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: "Nicolas Terol",
        description: "I make posts about frontend tech I use and love !",
        imagePath: "",
      }}
    >
      <main className={`${s.main} p-2 `}>
        <section className="flex min-h-[80vh] items-center">
          <PresentationSection />
          {bio ? <MDXRemote {...bio} components={{ Bio }} /> : null}
        </section>
        {/* <PresentationSection bioSource={bioSource} /> */}
        <section className={styles.section_layout}>
          <div className={styles.section_header}>
            <h2 className="font-bold text-2xl">Articles</h2>
          </div>
          <Masonry>
            {articles?.map((article, i) => (
              <PostCard
                key={article.slug}
                post={{ slug: article.slug ?? "", title: article.title ?? "" }}
                color={colors[i % colors.length]}
              />
            )) ?? <p>Je n'ai encore rien écris pour le moment </p>}
          </Masonry>
        </section>
      </main>
    </PageLayout>
  );
}
