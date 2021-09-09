import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import { getAllPosts } from "@utils/mdx/posts";
import type { IPost, Items, Locale } from "@custom-types/posts";
import Masonry from "@components/atoms/masonry";
import { getBio } from "@utils/mdx/about";

import styles from "../styles/Home.module.css";

import PresentationSection from "@components/organisms/presentation-section";
// import Header from "@components/organisms/header";
// import { Footer } from "@components/organisms/page-footer";
import PostCard from "@components/organisms/post-card";
import PageLayout from "@components/templates/page-layout";

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  locale = "fr",
}) => {
  const posts = getAllPosts(locale as Locale, [
    "slug",
    "date",
    "thumbnail",
    "title",
    "description",
  ]);

  const { content } = getBio(locale as Locale);
  const bioSource = await serialize(content);

  return { props: { posts, bioSource } };
};

type HomeProps = {
  posts: IPost[];
  bioSource: MDXRemoteSerializeResult;
};

const colors = [
  "#8bd3dd",
  "#F9F871",
  // "#BA3C67", "#00E2B4"
];

export default function Home({
  posts,
  bioSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  console.log(posts);
  return (
    <PageLayout
      header={
        <Head>
          <title>nterol</title>
          <meta name="description" content="nterol personal website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      }
    >
      <PresentationSection bioSource={bioSource} />
      <section className={styles.section_layout}>
        <div className={styles.section_header}>
          <h2>Articles</h2>
        </div>
        <Masonry>
          {posts.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              color={colors[i % colors.length]}
            />
          ))}
        </Masonry>
      </section>
    </PageLayout>
  );
}
