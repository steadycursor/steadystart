import { builder } from '../../../builder';
import { Account } from '../../../schema/Account';
import { createAccountSchema } from '@steadysass/validations';

builder.mutationField('createAccount', (t) =>
  t.field({
    type: Account,
    args: {
      name: t.arg({ type: 'String' }),
    },
    authScopes: {
      accessPolicy: 'authenticated',
    },
    validate: { schema: createAccountSchema },
    resolve: async (_parent, args, ctx) => {
      const account = await ctx.prisma.account.create({
        data: {
          name: args.name,
          memberships: {
            create: { userId: ctx.user!.id },
          },
        },
      });

      return account;
    },
  }),
);
