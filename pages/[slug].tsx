import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import PageLayout from "@components/templates/page-layout";
import { getAllPosts, getPost } from "@utils/mdx/posts";
import classes from "../styles/About.module.css";

export type PageProps = {
  frontmatter: any;
  source: MDXRemoteSerializeResult;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params: { slug },
  locale,
}) => {
  const { content, data } = getPost(`${locale}/${slug}`);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: { source: mdxSource, frontMatter: data },
  };
};

export async function getStaticPaths({ locales }) {
  const allPosts = locales
    .map((locale) => getAllPosts(locale, ["slug"]))
    .flat();

  const allSlugs = allPosts.map(({ slug }) => `/${slug}`);

  return {
    paths: allSlugs,
    fallback: false,
  };
}

const PostPage = ({
  source,
  frontMatter,
}: InferGetStaticPropsType<typeof getSDtaticProps>) => {
  console.log(frontMatter);
  return (
    <PageLayout header={<div>coucou</div>}>
      <section className={classes.container}>
        <MDXRemote {...source} components={[Link]} />
      </section>
    </PageLayout>
  );
};

export default PostPage;
