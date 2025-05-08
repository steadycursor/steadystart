import { Context } from '../context';

export type ForbiddenAuthScopeArgs = boolean;

export const forbiddenAuthScope = (_ctx: Context) => async (args: ForbiddenAuthScopeArgs) => {
  if (args === true) {
    return false;
  }

  return true;
};