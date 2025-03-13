import { Context } from '../context';

export type UserHasAccessOnWorkspaceScopeArgs = true | { id: string };

export const userHasAccessOnWorkspaceScope = (ctx: Context) => async (args: UserHasAccessOnWorkspaceScopeArgs) => {
  if (!ctx.user) {
    return false;
  }

  if (args === true && !ctx.workspace) {
    return false;
  }

  const membership = await ctx.prisma.membership.findFirst({
    where: {
      workspaceId: args === true ? ctx.workspace!.id : args.id,
      userId: ctx.user!.id,
    },
  });

  if (!membership) {
    return false;
  }

  return true;
};
