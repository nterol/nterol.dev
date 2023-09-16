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

  const { allArticles: articles, about, allQuizzs } = data;

  if (!about) return { notFound: true };
  const bio = about.description ? await serialize(about.description) : null;
  const quizzes = await Promise.all(
    allQuizzs.map(async (item) => {
      const content = item.content ? await serialize(item.content) : null;
      return {
        ...item,
        content,
      };
    })
  );

  return {
    props: {
      bio,
      quizzes,
      articles,
    },
  };
};

type HomeProps = {
  articles: FrontPageQuery["allArticles"];
  bio: UncertainMDX;
  quizzes: { content: UncertainMDX; id: string }[];
};

const colors = ["#8bd3dd", "#F9F871"];

export default function Home({
  articles,
  bio,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: "Nicolas Terol",
        description: "I make posts about frontend tech I use and love !",
        imagePath: "",
      }}
    >
      <main className={`${s.main} p-2 `}>
        <section className="flex min-h-[80vh] justify-center items-center gap-3">
          <PresentationSection />
          {bio ? <MDXRemote {...bio} components={{ Bio }} /> : null}
        </section>

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
