import { SignedIn, UserButton, useAuth } from '@clerk/nextjs';
import zod from 'zod';
import { useRouter } from 'next/router';
import { Div } from './Div';
import { useQueryParamsFromZodSchema } from '@/hooks/useQueryParamsFromZodSchema';
import Link from 'next/link';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import { query, $ } from '@/generated/typed-graphql-builder';
import { useUrqlContext } from '@/hooks/useUrqlContext';
import { ChildrenProps } from '@/types/ChildrenProps';
import { useState } from 'react';
import { Button } from './Button';

type PageProps = ChildrenProps & {
  title: string;
};

export const Page = ({ title, children }: PageProps) => {
  const queryParams = useQueryParamsFromZodSchema(zod.object({ account: zod.string().optional() }));
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [accountQuery] = useQuery({
    query: query((query) => [query.account({ id: $('id') }, (account) => [account.id, account.name])]),
    variables: { id: queryParams.account! },
    pause: !queryParams.account,
  });

  useEffect(() => {
    if (isSignedIn === false) {
      router.push('/auth/login');
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <Div>
      <Div className="flex justify-between items-center px-4 pt-3 pb-1 sm:hidden">
        <Div className="text-lg font-semibold">{accountQuery.data?.account?.name}</Div>
        <Div className="flex gap-2">
          <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>Menu</Button>
        </Div>
      </Div>
      <Div className="flex bg-white gap-10 p-4 sm:h-screen">
        <Div
          className={[
            'sm:w-64 w-full flex-col justify-between items-center', //
            isSidebarOpen ? 'flex' : 'hidden',
            'sm:flex',
          ]}
        >
          <Div>
            {accountQuery.data?.account?.id && (
              <Div>
                <Div className="text-lg font-semibold">{accountQuery.data.account.name}</Div>
                <Link href={`/`} className="text-sm text-gray-600">
                  <button onClick={() => setIsSidebarOpen(false)}>witch account</button>
                </Link>
              </Div>
            )}
          </Div>
          <Div>
            <SignedIn>
              <Div className="bg-gray-100 p-2 rounded-md">
                <UserButton showName />
              </Div>
            </SignedIn>
          </Div>
        </Div>

        <Div
          className={[
            'bg-gray-100 rounded-lg py-8 px-10 flex-1',
            !isSidebarOpen ? 'block' : 'hidden', //
            'sm:block',
          ]}
        >
          <h1 className="text-2xl font-semibold mb-4">{title}</h1>
          <Div>{children}</Div>
        </Div>
      </Div>
    </Div>
  );
};
