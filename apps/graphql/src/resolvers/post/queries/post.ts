import { builder } from '../../../builder';
import { Post } from '../../../schema/Post';

builder.queryField('post', (t) =>
  t.field({
    type: Post,
    args: {
      id: t.arg({ type: 'ID' }),
    },
    authScopes: async (_parent, args, _ctx) => ({
      accessPolicy: 'authenticated',
      userHasAccessOnWorkspace: true,
      modelItemsBelongToWorkspace: [{ id: args.id, model: 'post' }],
    }),
    resolve: async (_parent, args, ctx) => {
      const post = await ctx.prisma.post.findFirstOrThrow({
        where: {
          id: args.id,
        },
      });

      return post;
    },
  }),
);
