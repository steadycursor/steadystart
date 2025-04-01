import { PrismaClient, User } from '@steadystart/prisma';
import { match } from 'ts-pattern';
import { getClerkSessionData } from './getClerkSessionData';
import { findOrCreateUser } from './findOrCreateUser';
import { ContextProps } from '../../context';

type ResolveUserFromContextArgs = ContextProps & {
  prisma: PrismaClient;
};

export const resolveUserFromContext = async ({ request, prisma, test }: ResolveUserFromContextArgs): Promise<User | null> => {
  return match({ request, test })
    .when(
      ({ request }) => !!request,
      async ({ request }) => {
        const clerkSessionData = await getClerkSessionData({ request: request! });

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
