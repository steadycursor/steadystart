import { createPostSchema } from '@steadystart/validations';
import { builder } from '../../../builder';
import { Post } from '../../../schema/Post';

builder.mutationField('createPost', (t) =>
  t.field({
    type: Post,
    args: {
      name: t.arg({ type: 'String' }),
    },
    authScopes: {
      accessPolicy: 'authenticated',
      userHasAccessOnAccount: true,
    },
    validate: { schema: createPostSchema },
    resolve: async (_parent, args, ctx) => {
      const post = await ctx.prisma.post.create({
        data: {
          name: args.name,
          accountId: ctx.account!.id,
        },
      });

      return post;
    },
  }),
);
