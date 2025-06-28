import { ClerkClient } from '@clerk/backend';
import { User } from '@steadystart/prisma';
import { Secrets } from '@steadystart/secrets';
import { match } from 'ts-pattern';
import { findOrCreateUser } from './findOrCreateUser';
import { getClerkSessionData } from './getClerkSessionData';
import { ContextProps } from '../../context';
import { PaginatedPrisma } from '../../prisma';

type ResolveUserFromContextArgs = ContextProps & {
  prisma: PaginatedPrisma;
  clerk: ClerkClient;
  secrets: Secrets;
};

export const resolveUserFromContext = async ({ request, prisma, test, clerk, secrets }: ResolveUserFromContextArgs): Promise<User | null> => {
  return match({ request, test })
    .when(
      ({ request }) => !!request,
      async ({ request }) => {
        const clerkSessionData = await getClerkSessionData({ request: request!, clerk, secrets });

        const user = clerkSessionData
          ? await findOrCreateUser({
              clerkUserId: clerkSessionData.userId,
              emailAddress: clerkSessionData.emailAddress,
              prisma,
            })
          : null;

        return user;
      },
    )
    .when(
      ({ test }) => test?.userId,
      async ({ test }) => {
        const id = test?.userId;

        if (!id) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { id } });

        return user;
      },
    )
    .otherwise(() => null);
};
