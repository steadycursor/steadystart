import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_DIRECT_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
});

export type Secrets = z.infer<typeof schema>;

export const parseSecrets = (): Readonly<Secrets> => {
  const parsed = schema.parse(process.env);

  return Object.freeze(parsed);
};
