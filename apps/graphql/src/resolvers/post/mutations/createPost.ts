import { createPostSchema } from '@steadystart/validations';
import { builder } from '../../../builder';
import { Post } from '../../../schema/Post';

builder.mutationField('createPost', (t) =>
  t.field({
    type: Post,
    args: {
      title: t.arg({ type: 'String' }),
    },
    authScopes: {
      accessPolicy: 'authenticated',
      userHasAccessOnWorkspace: true,
    },
    validate: { schema: createPostSchema },
    resolve: async (_parent, args, ctx) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: args.title,
          workspaceId: ctx.workspace!.id,
        },
      });

      return post;
    },
  }),
);
