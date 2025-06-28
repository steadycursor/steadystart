import { createClerkClient } from '@clerk/backend';
import { parseSecrets } from '@steadystart/secrets';
import { PaginatedPrisma, prisma as productionPrisma } from './prisma';
import { Request } from './types/Request';
import { resolveUserFromContext } from './utils/context/resolveUserFromContext';
import { resolveWorkspaceFromContext } from './utils/context/resolveWorkspaceFromContext';

export type ContextProps = {
  request: Request | undefined;
  test?: {
    prisma: PaginatedPrisma;
    userId: string | undefined;
    workspaceId: string | undefined;
  };
};

export const createContext = async ({ request, test }: ContextProps) => {
  const secrets = parseSecrets();

  const clerk = createClerkClient({
    secretKey: secrets.CLERK_SECRET_KEY,
  });

  const prisma = test ? test.prisma : productionPrisma;

  const user = await resolveUserFromContext({ request, prisma, test, clerk, secrets });
  const workspace = await resolveWorkspaceFromContext({ user, request, prisma, test });

  return {
    user,
    workspace,
    secrets,
    prisma,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
