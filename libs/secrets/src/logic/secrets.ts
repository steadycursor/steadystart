import { parseEnv } from 'znv';
import { z } from 'zod';

export const parseSecrets = () => {
  // eslint-disable-next-line no-process-env
  const secrets = parseEnv(process.env, {
    DATABASE_URL: z.string().url(),
    DATABASE_DIRECT_URL: z.string().url(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    CLERK_SECRET_KEY: z.string(),
  });

  return secrets;
};
