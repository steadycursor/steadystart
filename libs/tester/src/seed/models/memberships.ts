import { Prisma } from '@steadystart/prisma';
import { DateTime } from 'luxon';
import { SeedDatabaseModelFunctionArgs } from '../../types/SeedDatabaseModelFunctionArgs';

export const memberships = [
  {
    id: '23acd84321ea491c8e27',
    userId: '8efb256531f14abf84bd',
    workspaceId: '56bff15d207f41f9b20d',
    createdAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
  },
  {
    id: '8bde175693b74a4ca012',
    userId: '8efb256531f14abf84bd',
    workspaceId: 'c4ff8234d86d4f2b9321',
    createdAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
  },
  {
    id: 'f5e7d92a45c64b87b103',
    userId: 'f73f921ab74948019d1a',
    workspaceId: '56bff15d207f41f9b20d',
    createdAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
  },
] satisfies Prisma.MembershipCreateArgs['data'][];

export const seedMemberships: SeedDatabaseModelFunctionArgs = async ({ prisma }) => {
  const seededMemberships = await prisma.$transaction(
    memberships.map((membershipData) =>
      prisma.membership.create({
        data: {
          ...membershipData,
        },
      }),
    ),
  );

  return {
    resetDateFields: async () => {
      await prisma.$transaction(
        seededMemberships.map((seededMembership) =>
          prisma.membership.update({
            where: {
              id: seededMembership.id,
            },
            data: {
              createdAt: memberships.find((membershipData) => membershipData.id === seededMembership.id)!.createdAt,
              updatedAt: memberships.find((membershipData) => membershipData.id === seededMembership.id)!.updatedAt,
            },
          }),
        ),
      );
    },
  };
};
