import { PrismaClient } from '@steadystart/prisma';
import { Context } from '../context';

type CreateContextForAuthScopeTestArgs = {
  user: Context['user'];
  workspace: Context['workspace'];
  prisma: PrismaClient;
};

export const createContextForAuthScopeTest = ({ user, workspace, prisma }: CreateContextForAuthScopeTestArgs): Context => {
  const context = {
    user,
    workspace,
    prisma,
  } satisfies Omit<Context, 'secrets'>;

  return context as unknown as Context;
};
