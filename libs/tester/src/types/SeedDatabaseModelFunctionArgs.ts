import { PrismaClient } from '@steadystart/prisma';

export type SeedDatabaseModelFunctionArgs = {
  (args: { prisma: PrismaClient }): Promise<{ resetDateFields: () => Promise<void> }>;
};
