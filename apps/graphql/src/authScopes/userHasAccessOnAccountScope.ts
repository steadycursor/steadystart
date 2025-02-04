import { Context } from '../context';

export type UserHasAccessOnAccountScopeArgs = true | { id: string };

export const userHasAccessOnAccountScope = (ctx: Context) => async (args: UserHasAccessOnAccountScopeArgs) => {
  if (!ctx.user) {
    return false;
  }

  if (args === true && !ctx.account) {
    return false;
  }

  const membership = await ctx.prisma.membership.findFirst({
    where: {
      accountId: args === true ? ctx.account!.id : args.id,
      userId: ctx.user!.id,
    },
  });

  if (!membership) {
    return false;
  }

  return true;
};
