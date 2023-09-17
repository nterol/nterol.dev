import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";

import client from "@/apollo-client";

import { PresentationSection } from "@/components/organisms/presentation-section";

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
import Link from "next/link";
import { longDate } from "@/utils/date";

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
      locale,
    },
  };
};

type HomeProps = {
  articles: FrontPageQuery["allArticles"];
  bio: UncertainMDX;
  quizzes: { content: UncertainMDX; id: string }[];
  locale: string;
};

const colors = ["#8bd3dd", "#F9F871"];

export default function Home({
  articles,
  bio,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout
      meta={{
        pageTitle: "Nicolas Terol",
        description: "I make posts about frontend tech I use and love !",
        imagePath: "",
      }}
    >
      <main className={`${s.main} md:p-2 `}>
        <section className="min-h-[80vh] flex flex-col justify-center">
          <div className="prose md:max-w-[45vw]">
            <PresentationSection />
            {bio ? (
              <div className="font-bold lg:text-xl text-black">
                <MDXRemote {...bio} />
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-4 flex flex-col gap-4">
          <a id="articles">
            <h2 className="font-extrabold text-xl lg:text-3xl">Articles</h2>
          </a>

          {articles?.map((article) => (
            <article className="flex flex-col gap-1" key={article.slug}>
              <Link href={`/post/${article.slug}`}>
                <h1 className="text-2xl font-bold">{article.title}</h1>
              </Link>
              <p>{article.description}</p>
              <span className="flex gap-8 items-center">
                <p className="font-bold text-sm text-inkblue">
                  {longDate(article._updatedAt ?? article._createdAt, locale)}{" "}
                </p>
                <span>&rarr;</span>
              </span>
            </article>
          ))}
        </section>
        <section className="mt-6">
          <a id="contact">
            <h2 className="font-extrabold lg:text-3xl text-xl">Contact</h2>
          </a>
        </section>
      </main>
    </PageLayout>
  );
}
