import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { routes } from '@steadystart/routes';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { UrqlProvider } from '../../providers/urql';
import { HeadTitle } from '@/components/HeadTitle';
import type { AppProps } from 'next/app';

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
