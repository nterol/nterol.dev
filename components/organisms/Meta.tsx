import Head from "next/head";
import { useRouter } from "next/router";

import { SITE_URL, SITE_NAME } from "@/utils/constants";

export type MetaProps = {
  pageTitle: string;
  description: string;
  imagePath: string;
};

export const Meta = ({
  pageTitle,
  description,
  imagePath,
}: MetaProps): JSX.Element => {
  const router = useRouter();
  const ogUrl = SITE_URL + router.asPath;
  const ogType = router.pathname === "/" ? "website" : "article";
  //   const ogTitle = pageTitle ? pageTitle : "Nicolas Terol personal blog";
  const ogImage = `${SITE_URL}${imagePath}`;

  return (
    <Head>
      <title>{`${SITE_NAME} - ${pageTitle}`}</title>
      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      /> */}
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#001858" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#fff" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={description} key="description" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta
        property="og:description"
        content={description}
        key="ogDescription"
      />
      <meta property="og:image" content={ogImage} key="ogImage" />
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_USERNAME} />
      <meta name="twitter:creator" content={TWITTER_USERNAME} />
      <meta name="twitter:title" content="nterol" /> */}
    </Head>
  );
};
