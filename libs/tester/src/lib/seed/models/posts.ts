import { Prisma } from '@steadystart/prisma';
import { DateTime } from 'luxon';
import { SeedDatabaseModelFunctionArgs } from '../../../types/SeedDatabaseModelFunctionArgs';

import { workspaces } from './workspaces';

export const posts = {
  0: {
    id: '31eff82d609d4a7f95e4',
    title: 'First Post',
    workspaceId: workspaces[0].id,
    createdAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
  },
  1: {
    id: '7ab34c9d871e42f0a265',
    title: 'Second Post',
    workspaceId: workspaces[0].id,
    createdAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
  },
  2: {
    id: 'e2f1d78a362c4d9ba016',
    title: 'Random post title',
    workspaceId: workspaces[1].id,
    createdAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
  },
} satisfies Record<number, Prisma.PostCreateArgs['data']>;

export const seedPosts: SeedDatabaseModelFunctionArgs = async ({ prisma }) => {
  const seededPosts = await prisma.$transaction(
    Object.values(posts).map((postData) =>
      prisma.post.create({
        data: {
          ...postData,
        },
      }),
    ),
  );

  return {
    resetDateFields: async () => {
      await prisma.$transaction(
        seededPosts.map((seededPost) =>
          prisma.post.update({
            where: {
              id: seededPost.id,
            },
            data: {
              createdAt: Object.values(posts).find((postData) => postData.id === seededPost.id)!.createdAt,
              updatedAt: Object.values(posts).find((postData) => postData.id === seededPost.id)!.updatedAt,
            },
          }),
        ),
      );
    },
  };
};
