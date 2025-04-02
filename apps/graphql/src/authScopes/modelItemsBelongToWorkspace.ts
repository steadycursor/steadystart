import { Context } from '../context';

export type Model = 'post';

export type ModelItemsBelongToWorkspaceScopeArgs = ({ id: string } | { ids: string[] }) & { model: Model };

export const modelItemsBelongToWorkspaceScope = (ctx: Context) => async (args: ModelItemsBelongToWorkspaceScopeArgs) => {
  const ids = 'id' in args ? [args.id] : args.ids;

  if (ids.length === 0) {
    return true;
  }

  if (!ctx.workspace) {
    return false;
  }

  const uniqueIds = Array.from(new Set(ids));

  const items = await ctx.prisma[args.model].findMany({ where: { id: { in: uniqueIds }, workspaceId: ctx.workspace.id } });

  if (items.length !== uniqueIds.length) {
    return false;
  }

  return true;
};
