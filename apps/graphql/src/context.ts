import { createClerkClient } from '@clerk/backend';
import { prisma } from './prisma';
import { secrets } from './secrets';
import { Request } from './types/Request';
import { findOrCreateUser } from './utils/context/findOrCreateUser';
import { getClerkSessionData } from './utils/context/getClerkSessionData';

type ContextProps = {
  request: Request;
};

export const clerk = createClerkClient({
  secretKey: secrets.CLERK_SECRET_KEY,
});

export const context = async ({ request }: ContextProps) => {
  const clerkSessionData = await getClerkSessionData({ request });

  const user = clerkSessionData
    ? await findOrCreateUser({ clerkUserId: clerkSessionData.userId, emailAddress: clerkSessionData.emailAddress, prisma })
    : undefined;

  return {
    request,
    prisma,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof context>>;
