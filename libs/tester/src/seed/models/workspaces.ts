import { Prisma } from '@steadystart/prisma';
import { DateTime } from 'luxon';
import { SeedDatabaseModelFunctionArgs } from '../../types/SeedDatabaseModelFunctionArgs';

export const workspaces = [
  {
    id: '56bff15d207f41f9b20d',
    title: 'Test Workspace 1',
    createdAt: DateTime.fromISO('2000-02-15T14:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T14:30').toJSDate(),
  },
  {
    id: 'c4ff8234d86d4f2b9321',
    title: 'Test Workspace 2',
    createdAt: DateTime.fromISO('2000-02-15T14:30').toJSDate(),
    updatedAt: DateTime.fromISO('2000-02-15T14:30').toJSDate(),
  },
] satisfies Prisma.WorkspaceCreateArgs['data'][];

export const seedWorkspaces: SeedDatabaseModelFunctionArgs = async ({ prisma }) => {
  const seededWorkspaces = await prisma.$transaction(
    workspaces.map((workspaceData) =>
      prisma.workspace.create({
        data: {
          ...workspaceData,
        },
      }),
    ),
  );

  return {
    resetDateFields: async () => {
      await prisma.$transaction(
        seededWorkspaces.map((seededWorkspace) =>
          prisma.workspace.update({
            where: {
              id: seededWorkspace.id,
            },
            data: {
              createdAt: workspaces.find((workspaceData) => workspaceData.id === seededWorkspace.id)!.createdAt,
              updatedAt: workspaces.find((workspaceData) => workspaceData.id === seededWorkspace.id)!.updatedAt,
            },
          }),
        ),
      );
    },
  };
};
