import { ClerkClient } from '@clerk/backend';
import { Secrets } from '@steadystart/secrets';
import { Request } from '../../types/Request';

type GetClerkSessionDataArgs = {
  request: Request;
  clerk: ClerkClient;
  secrets: Secrets;
};
export const getClerkSessionData = async ({ request, clerk, secrets }: GetClerkSessionDataArgs) => {
  const { isSignedIn, toAuth } = await clerk.authenticateRequest(request as unknown as any, {
    publishableKey: secrets.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  });

  const auth = toAuth();

  const userId = auth?.userId;

  const user = userId ? await clerk.users.getUser(userId) : undefined;

  const emailAddress = user?.primaryEmailAddress?.emailAddress;

  if (isSignedIn && userId && emailAddress) {
    return { userId, emailAddress };
  }

  return null;
};
