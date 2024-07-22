import { parseEnv } from 'znv';
import { z } from 'zod';

export const parseSecrets = () => {
  // eslint-disable-next-line no-process-env
  const secrets = parseEnv(process.env, {
    DATABASE_URL: z.string().url(),
  });

  return secrets;
};
