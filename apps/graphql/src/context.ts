import { createClerkClient } from '@clerk/backend';
import { prisma } from './prisma';
import { secrets } from './secrets';
import { Request } from './types/Request';
import { findAndValidateAccountFromRequstHeaders } from './utils/context/findAndValidateAccountFromRequstHeaders';
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

  const account = await findAndValidateAccountFromRequstHeaders({ request, user });

  return {
    request,
    prisma,
    user,
    account,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
