import type { NextConfig } from 'next';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import nextTranslatePlugin from 'next-translate-plugin';

loadEnv({ path: resolve(__dirname, '../../.env') });

const nextConfig: NextConfig = nextTranslatePlugin({
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});

export default nextConfig;
