import { ReactNode } from 'react';
import { SignedIn, UserButton, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type PageProps = {
  title: string;
  children: ReactNode;
};

export const Page = ({ title, children }: PageProps) => {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn === false) {
      router.push('/auth/login');
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex bg-white gap-10 p-4 h-screen">
      <div className="w-64 flex flex-col justify-between items-center">
        <div></div>
        <div>
          <SignedIn>
            <div className="bg-gray-100 p-2 rounded-md">
              <UserButton showName />
            </div>
          </SignedIn>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg py-8 px-10 flex-1">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  );
};
