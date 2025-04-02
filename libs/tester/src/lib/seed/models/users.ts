import { Prisma } from '@steadystart/prisma';
import { DateTime } from 'luxon';
import { SeedDatabaseModelFunctionArgs } from '../../../types/SeedDatabaseModelFunctionArgs';

export const users = {
  0: {
    id: '8efb256531f14abf84bd',
    clerkId: 'user_2KFGyu7zFgdcTPnC1IrHQQ93I1F',
    email: 'admin@example.com',
    locale: 'EN',
    createdAt: DateTime.fromISO('2000-02-15T13:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T13:30').toJSDate(),
  },
  1: {
    id: 'f73f921ab74948019d1a',
    clerkId: 'user_2N2LqsqRLkleZruGZHXf2Rx02io',
    email: 'user@example.com',
    locale: 'CS',
    createdAt: DateTime.fromISO('2000-02-15T13:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T13:30').toJSDate(),
  },
} satisfies Record<number, Prisma.UserCreateArgs['data']>;

export const seedUsers: SeedDatabaseModelFunctionArgs = async ({ prisma }) => {
  const seededUsers = await prisma.$transaction(
    Object.values(users).map((userData) =>
      prisma.user.create({
        data: {
          ...userData,
        },
      }),
    ),
  );

  return {
    resetDateFields: async () => {
      await prisma.$transaction(
        seededUsers.map((seededUser) =>
          prisma.user.update({
            where: {
              id: seededUser.id,
            },
            data: {
              createdAt: Object.values(users).find((userData) => userData.id === seededUser.id)!.createdAt,
              updatedAt: Object.values(users).find((userData) => userData.id === seededUser.id)!.updatedAt,
            },
          }),
        ),
      );
    },
  };
};
