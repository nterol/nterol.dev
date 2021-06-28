import "../styles/globals.css";

type AppProps = {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
