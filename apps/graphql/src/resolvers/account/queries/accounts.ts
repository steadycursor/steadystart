import { builder } from '../../../builder';
import { Account } from '../../../schema/Account';

builder.queryField('accounts', (t) =>
  t.field({
    type: [Account],
    authScopes: {
      accessPolicy: 'authenticated',
    },
    resolve: async (_parent, _args, ctx) => {
      const accounts = ctx.prisma.account.findMany({
        where: {
          memberships: { some: { userId: ctx.user!.id } },
        },
      });

      return accounts;
    },
  }),
);
