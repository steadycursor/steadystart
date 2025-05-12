import { match } from 'ts-pattern';
import { Context } from '../context';
import { GraphQLError } from '../utils/GraphQLError';

export type AccessPolicyAuthScopeArgs = 'public' | 'authenticated';

export const accessPolicyAuthScope = (ctx: Context) => async (accessPolicy: AccessPolicyAuthScopeArgs) => {
  return match(accessPolicy)
    .with('public', () => true)
    .with('authenticated', () => {
      if (!ctx.user) {
        throw new GraphQLError('USER_NOT_AUTHENTICATED');
      }

      return true;
    })
    .exhaustive();
};
