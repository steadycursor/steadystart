import { createWorkspaceSchema } from '@steadystart/validations';
import { builder } from '../../../builder';
import { Workspace } from '../../../schema/Workspace';

builder.mutationField('createWorkspace', (t) =>
  t.field({
    type: Workspace,
    args: {
      title: t.arg({ type: 'String' }),
    },
    authScopes: {
      accessPolicy: 'authenticated',
    },
    validate: { schema: createWorkspaceSchema },
    resolve: async (_parent, args, ctx) => {
      const workspace = await ctx.prisma.workspace.create({
        data: {
          title: args.title,
          memberships: {
            create: { userId: ctx.user!.id },
          },
        },
      });

      return workspace;
    },
  }),
);
