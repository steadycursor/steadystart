import { Context } from '../context';
import { GraphQLError } from '../utils/GraphQLError';

export type ForbiddenAuthScopeArgs = boolean;

export const forbiddenAuthScope = (_ctx: Context) => async (args: ForbiddenAuthScopeArgs) => {
  if (args === true) {
    throw new GraphQLError('FORBIDDEN_ACTION');
  }

  return true;
};
