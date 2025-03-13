import { builder } from '../../../builder';
import { Workspace } from '../../../schema/Workspace';

builder.queryField('workspace', (t) =>
  t.field({
    type: Workspace,
    args: {
      id: t.arg({ type: 'ID' }),
    },
    authScopes: (_parent, args, _ctx) => ({
      accessPolicy: 'authenticated',
      userHasAccessOnWorkspace: { id: args.id },
    }),
    resolve: async (_parent, args, ctx) => {
      const workspace = ctx.prisma.workspace.findUniqueOrThrow({
        where: {
          id: args.id,
        },
      });

      return workspace;
    },
  }),
);
