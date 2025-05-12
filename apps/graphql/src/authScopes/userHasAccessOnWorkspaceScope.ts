import { Context } from '../context';
import { GraphQLError } from '../utils/GraphQLError';

export type UserHasAccessOnWorkspaceScopeArgs = true | { id: string };

export const userHasAccessOnWorkspaceScope = (ctx: Context) => async (args: UserHasAccessOnWorkspaceScopeArgs) => {
  if (!ctx.user) {
    throw new GraphQLError('USER_NOT_FOUND');
  }

  if (args === true && !ctx.workspace) {
    throw new GraphQLError('VALID_WORKSPACE_NOT_FOUND_IN_HEADERS');
  }

  const membership = await ctx.prisma.membership.findFirst({
    where: {
      workspaceId: args === true ? ctx.workspace!.id : args.id,
      userId: ctx.user!.id,
    },
  });

  if (!membership) {
    throw new GraphQLError('NOT_AUTHORIZED');
  }

  return true;
};
