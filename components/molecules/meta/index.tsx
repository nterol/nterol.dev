import Head from "next/head";
import {useRouter} from 'next/router';
import { SITE_NAME, SITE_URL } from "@utils/constants";F

const Meta = ({ pageTitle }) => {
  const router = useRouter();

  const ogUrl = `${SITE_URL}${router.asPath}`;

  const ogType = router.pathname === "/" ? "website" : "post";
  const ofTitle = pageTitle
    ? pageTitle
    : "Nicolas Terol developpeur React, Nextjs";

  return (
    <Head>
      <title>{`${pageTitle} | ${SITE_NAME}`}</title>
    </Head>
  );
};