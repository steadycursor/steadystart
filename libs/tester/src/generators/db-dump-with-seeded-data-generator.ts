import { PrismaClient } from '@steadystart/prisma';
import * as path from 'path';
import { TestDatabaseOrchestrator } from '../lib/TestDatabaseOrchestrator';
import { seedFullDatabase } from '../lib/seed/seedFullDatabase';
import { exec } from '../utils/exec';

(async () => {
  const testDatabaseOrchestrator = new TestDatabaseOrchestrator();

  await testDatabaseOrchestrator.startDevDb();

  const databaseUrl = await testDatabaseOrchestrator.createDatabase();
  const prismaBinary = path.join(__dirname, '..', '..', '..', '..', 'libs', 'prisma', 'node_modules', '.bin', 'prisma');

  await exec(
    `pnpm cross-env DATABASE_URL="${databaseUrl}" DATABASE_DIRECT_URL="${databaseUrl}" ${prismaBinary} db push --accept-data-loss --schema ./../../libs/prisma/dist/schema.prisma`,
  );

  const client = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

  await seedFullDatabase({ prisma: client });

  const output = path.resolve(__dirname, '..', 'generated', 'test.dump.sql');

  await exec(
    `pnpm cross-env PGPASSWORD=${testDatabaseOrchestrator.password} pg_dump -c --host=${testDatabaseOrchestrator.host} --port=${testDatabaseOrchestrator.port} --username=${testDatabaseOrchestrator.user} ${testDatabaseOrchestrator.name} | tail -n +2 > ${output}`,
  );

  await testDatabaseOrchestrator.shutDevDb();

  process.exit();
})();
