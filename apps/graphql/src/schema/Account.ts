import { builder } from '../builder';
import { Context } from '../context';

export const Account = builder.loadableObject('Account', {
  load: (ids: string[], context: Context) => context.prisma.account.findMany({ where: { id: { in: ids } } }),
  sort: (account) => account.id,
  fields: (t) => ({
    id: t.expose('id', { type: 'ID' }),
    name: t.expose('name', { type: 'String' }),
  }),
});
