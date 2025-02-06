import { useAuth, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function AuthLoginPage() {
  const router = useRouter();
  const auth = useAuth();

  if (auth.isSignedIn) {
    return router.push('/');
  }

  return <RedirectToSignIn />;
}
