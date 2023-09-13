import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import Masonry from "@/components/atoms/masonry";
import { getBio } from "@/utils/mdx/about";
import PresentationSection from "@/components/organisms/presentation-section";
import PostCard from "@/components/organisms/post-card";
import PageLayout from "@/components/templates/page-layout";

import styles from "../styles/Home.module.css";

import client from "@/apollo-client";
import { getArticlePathsByLocale } from "@/graphql/articles/queries";
import {
  GetArticlePathsByLocaleQuery,
  GetArticlePathsByLocaleQueryVariables,
  SiteLocale,
} from "@/graphql/types";

import s from "@/components/templates/page-layout/page-layout.module.css";

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  locale = "fr",
}) => {
  const { content } = getBio(locale);
  const bioSource = await serialize(content);

  const { data } = await client.query<
    GetArticlePathsByLocaleQuery,
    GetArticlePathsByLocaleQueryVariables
  >({
    query: getArticlePathsByLocale,
    variables: { locale: locale as SiteLocale },
  });

  return { props: { bioSource, articles: data?.allArticles } };
};

type HomeProps = {
  articles: GetArticlePathsByLocaleQuery["allArticles"];
  bioSource: MDXRemoteSerializeResult;
};

const colors = ["#8bd3dd", "#F9F871"];

export default function Home({
  articles,
  bioSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: "Nicolas Terol",
        description: "I make posts about frontend tech I use and love !",
        imagePath: "",
      }}
    >
      <main className={s.main}>
        <PresentationSection bioSource={bioSource} />
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
