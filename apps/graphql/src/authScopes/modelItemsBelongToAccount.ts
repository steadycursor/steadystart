import { Context } from '../context';

export type Model = 'post';

export type ModelItemsBelongToAccountScopeArgs = ({ id: string } | { ids: string[] }) & { model: Model };

export const modelItemsBelongToAccountScope = (ctx: Context) => async (args: ModelItemsBelongToAccountScopeArgs) => {
  const ids = 'id' in args ? [args.id] : args.ids;

  if (ids.length === 0) {
    return true;
  }

  if (!ctx.account) {
    return false;
  }

  const uniqueIds = Array.from(new Set(ids));

  const result = ctx.prisma[args.model]
    .findMany({ where: { id: { in: uniqueIds }, accountId: ctx.account.id } })
    .then((data: any) => data.length === uniqueIds.length);

  if (!result) {
    return false;
  }

  return result;
};
