import { SignInButton } from '@clerk/remix';

export default function Index() {
  return (
    <div>
      <h1>Sign in</h1>
      <div>
        <SignInButton forceRedirectUrl="/" />
      </div>
    </div>
  );
}
