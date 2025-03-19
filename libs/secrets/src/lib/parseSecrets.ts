import { parseSecretsFromZodSchema } from './parseSecretsFromZodSchema';
import { secretsValidationSchema } from './secretsValidationSchema';

export const parseSecrets = () => {
  const { secrets, skipValidation } = parseSecretsFromZodSchema(secretsValidationSchema);

  if (skipValidation) {
    return secrets;
  }

  // CUSTOM VALIDATION of combination of values

  // if (secrets.ENVIRONMENT === 'test' && secrets.DATABASE_URL.includes('digitalocean.com')) {
  //   throw new Error('Invalid DATABASE_URL with environment.');
  // }

  return secrets;
};
