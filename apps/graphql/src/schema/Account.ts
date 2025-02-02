import { Prisma } from '@steadysass/prisma';
import { builder } from '../builder';
import { Context } from '../context';

export const includeOnAccount = {} satisfies Prisma.AccountInclude;

export const Account = builder.loadableObject('Account', {
  load: (ids: string[], context: Context) => context.prisma.account.findMany({ where: { id: { in: ids } }, include: includeOnAccount }),
  sort: (account) => account.id,
});

builder.objectType(Account, {
  fields: (t) => ({
    id: t.expose('id', { type: 'ID' }),
    name: t.expose('name', { type: 'String' }),
  }),
});
