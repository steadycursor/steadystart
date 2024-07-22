import { builder } from '../builder';

builder.queryField('hello', (t) =>
  t.field({
    type: 'String',
    resolve: async (_parent, _args, _context) => {
      return 'OK!';
    },
  }),
);
