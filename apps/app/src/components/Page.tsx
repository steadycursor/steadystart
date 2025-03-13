import { SignedIn, UserButton, useAuth } from '@clerk/nextjs';
import { Person24Regular, News24Regular, FluentIcon } from '@fluentui/react-icons';
import { routes } from '@steadystart/routes';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import zod from 'zod';
import { Button } from './Button';
import { Div } from './Div';
import { HeadTitle } from './HeadTitle';
import { Img } from './Img';
import { Loading } from './Loading';
import { query, $ } from '@/generated/typed-graphql-builder';
import { useChangeUserLocaleBasedOnItsSetting } from '@/hooks/useChangeUserLocaleBasedOnItsSetting';
import { useQueryParamsFromZodSchema } from '@/hooks/useQueryParamsFromZodSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { redirectUrlQueryParametr } from '@/pages/auth/login';
import { ChildrenProps } from '@/types/ChildrenProps';

type PageProps = ChildrenProps & {
  title: string;
};

export const Page = ({ title, children }: PageProps) => {
  useChangeUserLocaleBasedOnItsSetting();

  const { t } = useTranslation();
  const queryParams = useQueryParamsFromZodSchema(zod.object({ account: zod.string().optional() }));
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [meQuery] = useQuery({ query: query((query) => [query.me((me) => [me.locale])]) });

  const [accountQuery] = useQuery({
    query: query((query) => [query.account({ id: $('id') }, (account) => [account.id, account.name])]),
    variables: { id: queryParams.account! },
    pause: !queryParams.account,
  });

  useEffect(() => {
    if (isSignedIn === false) {
      const currentPath = encodeURIComponent(router.asPath);

      router.push(routes.auth.login() + `?${redirectUrlQueryParametr}=${currentPath}`);
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return (
      <Div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </Div>
    );
  }

  return (
    <Div>
      <Head>
        <HeadTitle title={`${title} | Steady Start`} />
      </Head>

      {/* Mobile navigation */}
      <Div className="flex justify-between items-center px-4 pt-3 pb-3 sm:pb-1 sm:hidden">
        <Link href={routes.home()}>
          <Div className="flex gap-3 items-center">
            <Img src="/logo.png" className="w-auto h-6" />
            <Div className="text-lg font-semibold">{accountQuery.data?.account?.name}</Div>
          </Div>
        </Link>
        <Div className="flex gap-2">
          <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{t('components:Page.mobileView.Menu')}</Button>
        </Div>
      </Div>
      {/* -- Mobile navigation */}

      <Div className="flex bg-brand gap-3 p-3 sm:h-screen">
        <Div
          className={[
            'sm:w-64 w-full flex-col justify-between px-3', //
            isSidebarOpen ? 'flex' : 'hidden',
            'sm:flex',
          ]}
        >
          <Div>
            {/* Logo with account switcher */}
            <Div className="sm:block hidden mb-6">
              <Link href={routes.home()}>
                <Div className="flex gap-4 items-center">
                  <Img src="/logo.png" className="w-auto h-10" />

                  <Div className="flex-1">
                    {accountQuery.data?.account?.id && (
                      <Div>
                        <Div className="font-semibold leading-1 truncate">{accountQuery.data.account.name}</Div>
                        <Link href={routes.home()} className="text-xs text-gray-600">
                          <Div>{t('components:Page.switchAccount')}</Div>
                        </Link>
                      </Div>
                    )}
                  </Div>
                </Div>
              </Link>
            </Div>
            {/* -- Logo with account switcher */}

            {/* Account navigation items */}
            {queryParams.account && accountQuery.data?.account?.id && (
              <SidebarSection title={t(`models:account.singular`)}>
                <Link href={routes.accounts.posts.index({ account: queryParams.account })}>
                  <SidebarItem title={t(`models:post.plural`)} Icon={News24Regular} />
                </Link>
              </SidebarSection>
            )}
            {/* -- Account navigation items */}

            {/* User navigation items */}
            <SidebarSection title={t(`models:user.singular`)}>
              <Link href={routes.user.profile()}>
                <SidebarItem title={t('components:ProfilePage.Page.title')} Icon={Person24Regular} />
              </Link>
            </SidebarSection>
            {/* -- User navigation items */}
          </Div>

          {/* Clerk User Button */}
          <Div className="flex justify-center">
            <SignedIn>
              <Div className="bg-white p-2 rounded-md">
                <UserButton showName />
              </Div>
            </SignedIn>
          </Div>
          {/* -- Clerk User Button */}
        </Div>

        {/* Content block */}
        <Div
          className={[
            'bg-gray-100 rounded-lg p-4 sm:py-8 sm:px-10 flex-1 overflow-scroll',
            !isSidebarOpen ? 'block' : 'hidden', //
            'sm:block',
          ]}
        >
          <h1 className="text-2xl font-semibold mb-4">{title}</h1>
          {meQuery.fetching && <Loading />}
          {meQuery.data && <Div>{children}</Div>}
        </Div>
        {/* Content block */}
      </Div>
    </Div>
  );
};

const SidebarSection = ({ title, children }: { title: string } & ChildrenProps) => {
  return (
    <Div className="space-y-2 mb-6">
      <Div className="font-semibold">{title}</Div>
      <Div className="space-y-1">{children}</Div>
    </Div>
  );
};

const SidebarItem = ({ title, Icon }: { title: string; Icon: FluentIcon }) => {
  return (
    <Div className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-black hover:bg-white">
      <Icon className="size-6 shrink-0 text-black" />
      {title}
    </Div>
  );
};
