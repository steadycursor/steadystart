import { Context } from '../context';
import { GraphQLError } from '../utils/GraphQLError';

/**
 * IMPORTANT NOTES FOR CLAUDE:
 * - When adding a new model type to the Model union create for new model test in modelItemsBelongToWorkspace.test.ts
 *    - Should work when {{model}} belongs to workspace with id argument
 *    - Should not work when {{model}} does not belong to workspace
 */

export type Model = 'post';

export type ModelItemScopeArg = { id: string | null | undefined; model: Model };

export type ModelItemsArrayArg = { ids: (string | null | undefined)[]; model: Model };

export type ModelItemsBelongToWorkspaceScopeArgs = (ModelItemScopeArg | ModelItemsArrayArg)[];

const checkSingleModelItemsBelongToWorkspaceScope = async (ctx: Context, args: ModelItemScopeArg | ModelItemsArrayArg): Promise<boolean> => {
  if ('id' in args && (args.id === null || args.id === undefined)) {
    return true;
  }

  const ids = 'id' in args ? (args.id ? [args.id] : []) : (args.ids.filter(Boolean) as string[]);

  if (ids.length === 0) {
    return true;
  }

  if (!ctx.workspace) {
    throw new GraphQLError('VALID_WORKSPACE_NOT_FOUND_IN_HEADERS');
  }

  const uniqueIds = Array.from(new Set(ids));

  const result = await ctx.prisma[args.model]
    // @ts-ignore - result type cannot be dynamic, but we know this is ok
    .findMany({ where: { id: { in: uniqueIds }, workspaceId: ctx.workspace.id } })
    .then((data: any) => data.length === uniqueIds.length);

  if (!result) {
    throw new GraphQLError('MODEL_ITEMS_DONT_BELONG_TO_WORKSPACE');
  }

  return result;
};

export const modelItemsBelongToWorkspaceScope =
  (ctx: Context) =>
  async (args: ModelItemsBelongToWorkspaceScopeArgs): Promise<boolean> => {
    if (!args || args.length === 0) {
      return true;
    }

    const results = await Promise.all(args.map((arg) => checkSingleModelItemsBelongToWorkspaceScope(ctx, arg)));

    return results.every((result) => result === true);
  };
