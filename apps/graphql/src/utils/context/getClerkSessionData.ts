import { clerk } from '../../context';
import { secrets } from '../../secrets';
import { Request } from '../../types/Request';

type GetClerkSessionDataArgs = {
  request: Request;
};
export const getClerkSessionData = async ({ request }: GetClerkSessionDataArgs) => {
  const { isSignedIn, toAuth } = await clerk.authenticateRequest(request as unknown as any, {
    publishableKey: secrets.CLERK_PUBLISHABLE_KEY,
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
