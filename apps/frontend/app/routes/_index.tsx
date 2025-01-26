import { SignOutButton, SignedIn, UserButton } from '@clerk/remix';
import { LoaderFunction, redirect } from '@remix-run/node';
import { getAuth } from '@clerk/remix/ssr.server';

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect('/sign-in');
  }

  return {};
};

export default function Index() {
  return (
    <div>
      <h1>Index Route</h1>
      <SignedIn>
        <p>You are signed in!</p>
        <SignOutButton />
        <UserButton />
      </SignedIn>
    </div>
  );
}
