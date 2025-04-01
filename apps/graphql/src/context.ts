import { createClerkClient } from '@clerk/backend';
import { prisma as productionPrisma } from './prisma';
import { secrets } from './secrets';
import { Request } from './types/Request';
import { PrismaClient } from '@steadystart/prisma';
import { resolveUserFromContext } from './utils/context/resolveUserFromContext';
import { resolveWorkspaceFromContext } from './utils/context/resolveWorkspaceFromContext';

export type ContextProps = {
  request: Request | undefined;
  test?: {
    prisma: PrismaClient;
    userId: string | undefined;
    workspaceId: string | undefined;
  };
};

export const clerk = createClerkClient({
  secretKey: secrets.CLERK_SECRET_KEY,
});

export const createContext = async ({ request, test }: ContextProps) => {
  const prisma = test ? test.prisma : productionPrisma;

  const user = await resolveUserFromContext({ request, prisma, test });
  const workspace = await resolveWorkspaceFromContext({ user, request, prisma, test });

  return {
    prisma,
    user,
    workspace,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
