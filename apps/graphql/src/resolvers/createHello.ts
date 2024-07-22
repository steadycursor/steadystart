import { builder } from '../builder';

builder.mutationField('createHello', (t) =>
  t.field({
    type: 'String',
    resolve: async (_parent, _args, _context) => {
      return 'Hello!';
    },
  }),
);
