import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import client from "apollo-client";

import { articleContent, getArticlePaths } from "graphql/articles/queries";
import type {
  ArticleContentQuery,
  ArticleContentQueryVariables,
  GetArticlePathsQuery,
  GetArticlePathsQueryVariables,
} from "graphql/types";
import PageLayout from "@/components/templates/page-layout";
import { CustomCompo } from "@/components/mdx/CustomCompo";
import { Aside, AsideContainer } from "@/components/mdx/Aside";
import { Def } from "@/components/mdx/Def";
import s from "@/components/templates/page-layout/page-layout.module.css";
import { getArticlesPath } from "@/utils/extract";

type Props = { content: MDXRemoteSerializeResult };

type PageParams = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, PageParams> = async ({
  params,
}) => {
  if (!params?.slug)
    return {
      notFound: true,
    };
  const { data } = await client.query<
    ArticleContentQuery,
    ArticleContentQueryVariables
  >({ query: articleContent, variables: { slug: params?.slug } });

  if (!data.article?.content) {
    return { notFound: true };
  }

  const content = await serialize(data.article.content);

  return { props: { content } };
};

export const getStaticPaths: GetStaticPaths = async (): Promise<
  GetStaticPathsResult<PageParams>
> => {
  const { data } = await client.query<
    GetArticlePathsQuery,
    GetArticlePathsQueryVariables
  >({ query: getArticlePaths });

  return {
    paths: getArticlesPath(data.allArticles),
    fallback: "blocking",
  };
};

export default function PostPage({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: "Nicolas Terol",
        description: "this website is mine",
        imagePath: "",
      }}
    >
      <main className={`${s.main} flex justify-center gap-1`}>
        <article className="prose lg:prose-xl">
          <MDXRemote {...content} components={{ CustomCompo, Aside, Def }} />
        </article>
        <AsideContainer />
      </main>
    </PageLayout>
  );
}
