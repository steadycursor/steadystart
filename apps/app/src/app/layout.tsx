import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import type { HeadMetaTitle } from '@/types/HeadMetaTitle';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Steady SASS' satisfies HeadMetaTitle,
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootLayout;
