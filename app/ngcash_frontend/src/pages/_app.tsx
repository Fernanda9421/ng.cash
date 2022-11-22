import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppProvider from '../context/AppProvider';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>NG.CA$H</title>
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </div>
  );
}
