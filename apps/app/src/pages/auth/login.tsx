import { useAuth, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { routes } from '@steadysass/routes';

export default function AuthLoginPage() {
  const router = useRouter();
  const auth = useAuth();

  if (auth.isSignedIn) {
    return router.push(routes.home());
  }

  return <RedirectToSignIn />;
}
