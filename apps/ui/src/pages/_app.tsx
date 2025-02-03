import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} afterSignOutUrl="/auth/login">
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
