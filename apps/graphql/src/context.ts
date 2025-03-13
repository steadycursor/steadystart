import { createClerkClient } from '@clerk/backend';
import { prisma } from './prisma';
import { secrets } from './secrets';
import { Request } from './types/Request';
import { findAndValidateWorkspaceFromRequestHeaders } from './utils/context/findAndValidateWorkspaceFromRequestHeaders';
import { findOrCreateUser } from './utils/context/findOrCreateUser';
import { getClerkSessionData } from './utils/context/getClerkSessionData';

type ContextProps = {
  request: Request;
};

export const clerk = createClerkClient({
  secretKey: secrets.CLERK_SECRET_KEY,
});

export const createContext = async ({ request }: ContextProps) => {
  const clerkSessionData = await getClerkSessionData({ request });

  const user = clerkSessionData
    ? await findOrCreateUser({ clerkUserId: clerkSessionData.userId, emailAddress: clerkSessionData.emailAddress, prisma })
    : undefined;

  const workspace = await findAndValidateWorkspaceFromRequestHeaders({ request, user });

  return {
    request,
    prisma,
    user,
    workspace,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
