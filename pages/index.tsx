import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { getAllPosts } from "@utils/mdx/posts";
import type { Items } from "@custom-types/posts";
import Masonry from "@components/atoms/masonry";
import { getBio } from "@utils/mdx/about";

import styles from "../styles/Home.module.css";
import PresentationSection from "@components/organisms/presentation-section";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getAllPosts([
    "slug",
    "date",
    "thumbnail",
    "title",
    "description",
  ]);

  const { content } = getBio();
  const bioSource = await serialize(content);

  return { props: { posts, bioSource } };
};

type HomeProps = {
  posts: Items[];
  bioSource: MDXRemoteSerializeResult;
};

export default function Home({
  posts,
  bioSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>nterol</title>
        <meta name="description" content="nterol personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PresentationSection bioSource={bioSource} />
        <section className={styles.section_layout}>
          <div className={styles.section_header}>
            <h2>Articles</h2>
          </div>
          <Masonry>
            {posts.map((post) =>
              post.type === "article" ? (
                <Link key={post.slug} href="/[slug]" as={`/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
              ) : (
                <article>
                  <h1>{post.title}</h1>
                </article>
              )
            )}
          </Masonry>
        </section>
      </main>
    </div>
  );
}
