import { builder } from '../../../builder';
import { Post } from '../../../schema/Post';

builder.queryField('posts', (t) =>
  t.field({
    type: [Post],
    authScopes: {
      accessPolicy: 'authenticated',
      userHasAccessOnAccount: true,
    },
    resolve: async (_parent, _args, ctx) => {
      const posts = ctx.prisma.post.findMany({
        where: {
          accountId: ctx.account!.id,
        },
      });

      return posts;
    },
  }),
);
