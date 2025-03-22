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
      modelItemsBelongToWorkspace: { model: 'post', id: args.id },
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
