import { Context } from '../context';

/**
 * IMPORTANT NOTES FOR CLAUDE:
 * - When adding a new model ype to the Model union create for new model test in modelItemsBelongToWorkspace.test.ts
 *    - Should work when {{model}} belongs to workspace with id argument
 *    - Should not work when {{model}} does not belong to workspace
 */

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
