import { match } from 'ts-pattern';
import { Context } from '../context';

export type AccessPolicyAuthScopeArgs = 'public' | 'authenticated';

export const accessPolicyAuthScope = (ctx: Context) => async (accessPolicy: AccessPolicyAuthScopeArgs) => {
  return match(accessPolicy)
    .with('public', () => true)
    .with('authenticated', () => !!ctx.user)
    .exhaustive();
};
