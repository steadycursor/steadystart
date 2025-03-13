import { useAuth, RedirectToSignIn } from '@clerk/nextjs';
import { routes } from '@steadystart/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import zod from 'zod';
import { useQueryParamsFromZodSchema } from '@/hooks/useQueryParamsFromZodSchema';

export const redirectUrlQueryParametr = 'redirect_url';

export default function AuthLoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { redirect_url } = useQueryParamsFromZodSchema(zod.object({ [redirectUrlQueryParametr]: zod.string().nullish() }));

  useEffect(() => {
    if (auth.isSignedIn) {
      router.push(routes.home());
    }
  }, [auth.isSignedIn, router]);

  return <RedirectToSignIn redirectUrl={redirect_url ?? routes.home()} />;
}
