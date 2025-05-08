import { prompt } from 'enquirer';
import * as fs from 'fs';
import * as path from 'path';

const constants = {
  stage: {
    DATABASE_URL: '',
    DATABASE_DIRECT_URL: '',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: '',
    CLERK_SECRET_KEY: '',
  },
  production: {
    DATABASE_URL: '',
    DATABASE_DIRECT_URL: '',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: '',
    CLERK_SECRET_KEY: '',
  },
  local: {
    DATABASE_URL: 'postgresql://postgres:mysecretpassword@localhost:5432/initdb&connection_limit=1&pool_timeout=30',
    DATABASE_DIRECT_URL: 'postgresql://postgres:mysecretpassword@localhost:5432/initdb&connection_limit=1&pool_timeout=30',
  },
} as const;

(async () => {
  const envFilePath = path.resolve(__dirname, '../../../.env');

  let envConfig = fs.readFileSync(envFilePath, 'utf-8');

  console.info('\nCurrent environment:', envConfig.match(/ENVIRONMENT=(.*)/)?.[0].replace('ENVIRONMENT=', ''), '\n');

  const { environment }: { environment: 'stage' | 'production' } = await prompt({
    type: 'autocomplete',
    name: 'environment',
    message: 'Select desired environment:',
    choices: [
      { value: 'stage', name: 'stage' },
      { value: 'production', name: 'production' },
    ],
  });

  const { shouldUseLocalDatabaseUrl }: { shouldUseLocalDatabaseUrl: boolean } = await prompt({
    type: 'confirm',
    name: 'shouldUseLocalDatabaseUrl',
    message: 'Do you want to use local DB?',
  });

  if (environment === 'stage') {
    envConfig = envConfig.replace(/ENVIRONMENT=.*/, 'ENVIRONMENT=stage');
    envConfig = envConfig.replace(/DATABASE_URL=.*/, `DATABASE_URL=${constants.stage.DATABASE_URL}`);
    envConfig = envConfig.replace(/DATABASE_DIRECT_URL=.*/, `DATABASE_DIRECT_URL=${constants.stage.DATABASE_DIRECT_URL}`);
    envConfig = envConfig.replace(
      /NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=.*/,
      `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${constants.stage.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
    );
    envConfig = envConfig.replace(/CLERK_SECRET_KEY=.*/, `CLERK_SECRET_KEY=${constants.stage.CLERK_SECRET_KEY}`);
  }

  if (environment === 'production') {
    envConfig = envConfig.replace(/ENVIRONMENT=.*/, 'ENVIRONMENT=production');
    envConfig = envConfig.replace(/DATABASE_URL=.*/, `DATABASE_URL=${constants.production.DATABASE_URL}`);
    envConfig = envConfig.replace(/DATABASE_DIRECT_URL=.*/, `DATABASE_DIRECT_URL=${constants.production.DATABASE_DIRECT_URL}`);
    envConfig = envConfig.replace(
      /NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=.*/,
      `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${constants.production.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
    );
    envConfig = envConfig.replace(/CLERK_SECRET_KEY=.*/, `CLERK_SECRET_KEY=${constants.production.CLERK_SECRET_KEY}`);
  }

  if (shouldUseLocalDatabaseUrl) {
    envConfig = envConfig.replace(/DATABASE_URL=.*/, `DATABASE_URL=${constants.local.DATABASE_URL}`);
    envConfig = envConfig.replace(/DATABASE_DIRECT_URL=.*/, `DATABASE_DIRECT_URL=${constants.local.DATABASE_DIRECT_URL}`);
  }

  console.info('\nNew values:\n');
  console.info(envConfig.match(/ENVIRONMENT=(.*)/)?.[0], '\n');
  console.info(envConfig.match(/DATABASE_URL=(.*)/)?.[0], '\n');
  console.info(envConfig.match(/DATABASE_DIRECT_URL=(.*)/)?.[0], '\n');

  fs.writeFileSync(envFilePath, envConfig);
})();
