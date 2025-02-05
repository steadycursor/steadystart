import { SignedIn, UserButton, useAuth } from '@clerk/nextjs';
import zod from 'zod';
import { useRouter } from 'next/router';
import { useQueryParamsFromZodSchema } from '@/hooks/useQueryParamsFromZodSchema';
import Link from 'next/link';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import { query, $ } from '@/generated/typed-graphql-builder';
import { useUrqlContext } from '@/hooks/useUrqlContext';
import { ChildrenProps } from '@/types/ChildrenProps';

type PageProps = ChildrenProps & {
  title: string;
};

export const Page = ({ title, children }: PageProps) => {
  const queryParams = useQueryParamsFromZodSchema(zod.object({ account: zod.string().optional() }));
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const [accountQuery] = useQuery({
    query: query((query) => [query.account({ id: $('id') }, (account) => [account.id, account.name])]),
    variables: { id: queryParams.account! },
    pause: !queryParams.account,
    context: useUrqlContext({ additionalTypenames: ['Account'] }),
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
    <div className="flex bg-white gap-10 p-4 h-screen">
      <div className="w-64 flex flex-col justify-between items-center">
        <div>
          {accountQuery.data?.account?.id && (
            <div>
              <div>{accountQuery.data.account.name}</div>
              <Link href={`/`}>
                <button>Switch account</button>
              </Link>
            </div>
          )}
        </div>
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
