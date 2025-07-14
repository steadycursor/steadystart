import { builder } from '../../../builder';
import { Workspace } from '../../../schema/Workspace';

builder.queryField('workspaces', (t) =>
  t.paginatedField({
    type: [Workspace],
    authScopes: {
      accessPolicy: 'authenticated',
    },
    pagination: { defaultPageSize: 20 },
    resolve: async (_parent, _args, ctx) => {
      return ctx.prisma.workspace.paginate({
        where: {
          memberships: { some: { userId: ctx.user!.id } },
        },
      });
    },
  }),
);
