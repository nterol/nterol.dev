import { useHydrateAtoms } from 'jotai/utils';
import App, { AppContext } from 'next/app';

import '../styles/globals.css';
import '@/styles/night-owl.css';

import { ViewerQueryData, viewerDataAtom } from '@/store/viewer-data';

type AppProps = {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
  nterol: ViewerQueryData['data']['viewer'];
};

// I know this is not ideal.
// I should use app/ folder instead, or client request
// I don't care
function MyApp({ Component, pageProps, nterol }: AppProps): JSX.Element {
  useHydrateAtoms([[viewerDataAtom, nterol]]);
  return <Component {...pageProps} />;
}
MyApp.getInitialProps = async (ctx: AppContext) => {
  const query = `{ viewer { login url name repository(name: "${process.env.GITHUB_REPO_NAME}") { pushedAt } } }`;
  const pageProps = await App.getInitialProps(ctx);
  const raw = await fetch(process.env.GITHUB_API as string, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
    }),
  });
  const res: ViewerQueryData = await raw.json();

  const nterol = res.data.viewer;

  return { nterol, pageProps };
};

export default MyApp;
