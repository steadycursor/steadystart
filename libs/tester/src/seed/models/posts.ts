import { Prisma } from '@steadystart/prisma';
import { DateTime } from 'luxon';
import { SeedDatabaseModelFunctionArgs } from '../../types/SeedDatabaseModelFunctionArgs';

export const posts = [
  {
    id: '31eff82d609d4a7f95e4',
    title: 'First Post',
    workspaceId: '56bff15d207f41f9b20d',
    createdAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
  },
  {
    id: '7ab34c9d871e42f0a265',
    title: 'Second Post',
    workspaceId: '56bff15d207f41f9b20d',
    createdAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
  },
  {
    id: 'e2f1d78a362c4d9ba016',
    title: 'Third Post',
    workspaceId: 'c4ff8234d86d4f2b9321',
    createdAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T16:30').toJSDate(),
  },
] satisfies Prisma.PostCreateArgs['data'][];

export const seedPosts: SeedDatabaseModelFunctionArgs = async ({ prisma }) => {
  const seededPosts = await prisma.$transaction(
    posts.map((postData) =>
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
              createdAt: posts.find((postData) => postData.id === seededPost.id)!.createdAt,
              updatedAt: posts.find((postData) => postData.id === seededPost.id)!.updatedAt,
            },
          }),
        ),
      );
    },
  };
};
