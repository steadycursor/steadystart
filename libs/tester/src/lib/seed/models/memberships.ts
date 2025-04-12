import { Prisma } from '@steadystart/prisma';
import { DateTime } from 'luxon';
import { users } from './users';
import { workspaces } from './workspaces';
import { SeedDatabaseModelFunctionArgs } from '../../../types/SeedDatabaseModelFunctionArgs';

export const memberships = {
  0: {
    id: '23acd84321ea491c8e27',
    userId: users[0].id,
    workspaceId: workspaces[0].id,
    createdAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
  },
  1: {
    id: '8bde175693b74a4ca012',
    userId: users[0].id,
    workspaceId: workspaces[1].id,
    createdAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
  },
  2: {
    id: 'f5e7d92a45c64b87b103',
    userId: users[1].id,
    workspaceId: workspaces[0].id,
    createdAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T15:30').toJSDate(),
  },
} satisfies Record<number, Prisma.MembershipCreateArgs['data']>;

export const seedMemberships: SeedDatabaseModelFunctionArgs = async ({ prisma }) => {
  const seededMemberships = await prisma.$transaction(
    Object.values(memberships).map((membershipData) =>
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
              createdAt: Object.values(memberships).find((membershipData) => membershipData.id === seededMembership.id)!.createdAt,
              updatedAt: Object.values(memberships).find((membershipData) => membershipData.id === seededMembership.id)!.updatedAt,
            },
          }),
        ),
      );
    },
  };
};
