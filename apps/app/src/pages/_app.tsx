import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import { UrqlProvider } from '../../providers/urql';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} afterSignOutUrl="/auth/login">
      <UrqlProvider>
        <Component {...pageProps} />
      </UrqlProvider>
    </ClerkProvider>
  );
}

export default MyApp;
