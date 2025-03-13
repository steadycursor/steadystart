import { builder } from '../../../builder';
import { Workspace } from '../../../schema/Workspace';

builder.queryField('workspaces', (t) =>
  t.field({
    type: [Workspace],
    authScopes: {
      accessPolicy: 'authenticated',
    },
    resolve: async (_parent, _args, ctx) => {
      const workspaces = ctx.prisma.workspace.findMany({
        where: {
          memberships: { some: { userId: ctx.user!.id } },
        },
      });

      return workspaces;
    },
  }),
);
