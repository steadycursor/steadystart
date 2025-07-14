import { builder } from '../../../builder';
import { Post } from '../../../schema/Post';

builder.queryField('posts', (t) =>
  t.field({
    type: [Post],
    authScopes: {
      accessPolicy: 'authenticated',
      userHasAccessOnWorkspace: true,
    },
    resolve: async (_parent, _args, ctx) => {
      return ctx.prisma.post.findMany({
        where: {
          workspaceId: ctx.workspace!.id,
        },
      });
    },
  }),
);
