import { builder } from '../../../builder';
import { Me } from '../../../schema/Me';

builder.queryField('me', (t) =>
  t.field({
    type: Me,
    authScopes: async (_parent, _args, _ctx) => ({
      accessPolicy: 'authenticated',
    }),
    resolve: async (_parent, _args, ctx) => {
      return ctx.user!;
    },
  }),
);
