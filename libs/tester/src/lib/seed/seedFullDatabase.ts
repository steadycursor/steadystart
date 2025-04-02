import { PrismaClient } from '@steadystart/prisma';
import { seedMemberships } from './models/memberships';
import { seedPosts } from './models/posts';
import { seedUsers } from './models/users';
import { seedWorkspaces } from './models/workspaces';

type SeedFullDatabaseArgs = {
  prisma: PrismaClient;
};

export const seedFullDatabase = async ({ prisma }: SeedFullDatabaseArgs): Promise<void> => {
  const userResult = await seedUsers({ prisma });
  const workspaceResult = await seedWorkspaces({ prisma });
  const membershipResult = await seedMemberships({ prisma });
  const postResult = await seedPosts({ prisma });

  await userResult.resetDateFields();
  await workspaceResult.resetDateFields();
  await membershipResult.resetDateFields();
  await postResult.resetDateFields();
};
