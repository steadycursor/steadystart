import { PrismaClient } from '@steadystart/prisma';
import { seedMemberships, seedPosts, seedUsers, seedWorkspaces } from '../../seed';

export class Seeder {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async seedAll(): Promise<void> {
    const userResult = await seedUsers({ prisma: this.prisma });
    const workspaceResult = await seedWorkspaces({ prisma: this.prisma });
    const membershipResult = await seedMemberships({ prisma: this.prisma });
    const postResult = await seedPosts({ prisma: this.prisma });

    await userResult.resetDateFields();
    await workspaceResult.resetDateFields();
    await membershipResult.resetDateFields();
    await postResult.resetDateFields();
  }
}