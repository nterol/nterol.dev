import Link from "next/link";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import PageLayout from "@components/templates/page-layout";
import { getAllPosts, getPost } from "@utils/mdx/posts";
// import classes from "../styles/About.module.css";
import c from "../styles/Article.module.css";

import { Matter } from "@custom-types/posts";

export type Props = {
  frontMatter: Matter;
  source: MDXRemoteSerializeResult;
};

type PageParams = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, PageParams> = async ({
  params,
  locale,
}) => {
  const { slug } = params || {};
  const { content, data } = getPost(`${locale}/${slug}`);

  const mdxSource = await serialize(content, {
    scope: data,
    // mdxOptions: {
    //   remarkPlugins: [require("remark-prism"), footnotes],
    // },
  });

  return {
    props: { source: mdxSource, frontMatter: data },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const allPosts = (locales ?? ["fr", "en-US"])
    ?.map((locale) => getAllPosts(locale, ["slug"]))
    ?.flat();

  const allSlugs = allPosts?.map(({ slug }) => `/${slug}`);

  return {
    paths: allSlugs,
    fallback: false,
  };
};

const components = {
  Link,
};

const PostPage = ({
  source,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(frontMatter);
  return (
    <PageLayout
      meta={{
        pageTitle: frontMatter.title,
        description: frontMatter.description,
        imagePath: frontMatter.thumbnail,
      }}
    >
      <div className={c.article_container}>
        <section className={c.content_wrapper}>
          <MDXRemote {...source} components={components} />
        </section>
        <aside className={c.aside_wrapper}>aside</aside>
      </div>
    </PageLayout>
  );
};

export default PostPage;
