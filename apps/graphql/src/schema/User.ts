import { builder } from '../builder';
import { Context } from '../context';

export const User = builder.loadableObject('User', {
  load: (ids: string[], context: Context) => context.prisma.user.findMany({ where: { id: { in: ids } } }),
  sort: (user) => user.id,
  fields: (t) => ({
    id: t.expose('id', { type: 'ID' }),
    name: t.expose('name', { type: 'String' }),
  }),
});
