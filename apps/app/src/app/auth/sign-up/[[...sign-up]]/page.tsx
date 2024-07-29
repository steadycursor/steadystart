import { SignUp } from '@clerk/nextjs';
import type { HeadMetaTitle } from '@/types/HeadMetaTitle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up | Steady SASS' satisfies HeadMetaTitle,
};

const SignUpPage = () => {
  return <SignUp />;
};

// eslint-disable-next-line import/no-default-export
export default SignUpPage;
