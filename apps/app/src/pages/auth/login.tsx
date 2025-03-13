import { useAuth, RedirectToSignIn } from '@clerk/nextjs';
import { routes } from '@steadystart/routes';
import { useRouter } from 'next/router';

export default function AuthLoginPage() {
  const router = useRouter();
  const auth = useAuth();

  if (auth.isSignedIn) {
    return router.push(routes.home());
  }

  return <RedirectToSignIn />;
}
