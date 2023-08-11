import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import remarkGFM from "remark-gfm";

import client from "apollo-client";
import { articleContent, getArticlePaths } from "graphql/articles/queries";
import type {
  ArticleContentQuery,
  ArticleContentQueryVariables,
  GetArticlePathsQuery,
  GetArticlePathsQueryVariables,
  SiteLocale,
} from "graphql/types";
import PageLayout from "@/components/templates/page-layout";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = { content: string };
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

  // const processedContent = await remark()
  //   .use(html)
  //   .use(prism)
  //   .use(footnotes)
  //   .process(data.article?.content);
  // const contentHTML = processedContent.toString();

  return { props: { content: data.article.content } };
};

export const getStaticPaths: GetStaticPaths = async ({}): Promise<
  GetStaticPathsResult<PageParams>
> => {
  const { data } = await client.query<
    GetArticlePathsQuery,
    GetArticlePathsQueryVariables
  >({ query: getArticlePaths });

  return {
    paths: data.allArticles
      .flatMap(({ _allSlugLocales }) => _allSlugLocales)
      .map((a) =>
        a
          ? {
              params: {
                slug: a?.value ?? "",
              },
              locale: a?.locale ?? "fr_FR",
            }
          : undefined
      )
      .filter(
        (e): e is { params: { slug: string }; locale: SiteLocale } => !!e
      ),
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
        description: "I make posts about frontend tech I use and love !",
        imagePath: "",
      }}
    >
      <article className="prose lg:prose-xl">
        <ReactMarkdown remarkPlugins={[remarkGFM]}>{content}</ReactMarkdown>
      </article>
    </PageLayout>
  );
}
