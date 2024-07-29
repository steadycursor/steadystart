import { SignIn } from '@clerk/nextjs';
import type { HeadMetaTitle } from '@/types/HeadMetaTitle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Steady SASS' satisfies HeadMetaTitle,
};

const SignInPage = () => {
  return <SignIn />;
};

// eslint-disable-next-line import/no-default-export
export default SignInPage;
