/* eslint-disable no-process-env */
import { parseEnv, Schemas, RestrictSchemas, ParsedSchema } from '@homoky/znv';

export const parseSecretsFromZodSchema = <T extends Schemas>(
  schema: T & RestrictSchemas<T>,
): {
  skipValidation: boolean;
  secrets: ParsedSchema<T>;
} => {
  const skipValidation = process.env.SKIP_ENV_VALIDATION === 'true';

  if (skipValidation) {
    return {
      skipValidation,
      secrets: process.env as unknown as ParsedSchema<T>,
    };
  }

  const secrets = parseEnv(process.env, schema as any) as ParsedSchema<T>;

  return {
    skipValidation,
    secrets,
  };
};
