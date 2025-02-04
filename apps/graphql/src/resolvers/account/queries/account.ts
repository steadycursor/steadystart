import { builder } from '../../../builder';
import { Account } from '../../../schema/Account';

builder.queryField('account', (t) =>
  t.field({
    type: Account,
    args: {
      id: t.arg({ type: 'ID' }),
    },
    authScopes: (_parent, args, _ctx) => ({
      accessPolicy: 'authenticated',
      userHasAccessOnAccount: { id: args.id },
    }),
    resolve: async (_parent, args, ctx) => {
      const account = ctx.prisma.account.findUniqueOrThrow({
        where: {
          id: args.id,
        },
      });

      return account;
    },
  }),
);
