import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { HeadTitle } from '@/components/HeadTitle';
import type { AppProps } from 'next/app';
import { UrqlProvider } from '../../providers/urql';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { routes } from '@steadystart/routes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} afterSignOutUrl={routes.auth.login()}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <HeadTitle title="Steady Start" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <UrqlProvider>
        <Component {...pageProps} />
      </UrqlProvider>
    </ClerkProvider>
  );
}

export default MyApp;
