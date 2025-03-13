import { updateUserSchema } from '@steadystart/validations';
import { builder } from '../../../builder';
import { Locale } from '../../../schema/Locale';
import { Me } from '../../../schema/Me';

builder.mutationField('updateUser', (t) =>
  t.field({
    type: Me,
    args: {
      locale: t.arg({ type: Locale }),
    },
    authScopes: {
      accessPolicy: 'authenticated',
    },
    validate: { schema: updateUserSchema },
    resolve: async (_parent, args, ctx) => {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.user!.id }, //
        data: { locale: args.locale },
      });

      return user;
    },
  }),
);
