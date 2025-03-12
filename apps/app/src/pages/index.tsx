import { Page } from '../components/Page';
import { useQuery } from 'urql';
import { query } from '@/generated/typed-graphql-builder';
import { Section } from '@/components/Section';
import { CreateAccountForm } from '@/forms/CreateAccountForm';
import { match, P } from 'ts-pattern';
import { UnexpectedErrorAlert } from '@/components/UnexpectedErrorAlert';
import Link from 'next/link';
import { routes } from '@steadystart/routes';
import { EmptyState } from '@/components/EmptyState';
import { Loading } from '@/components/Loading';
import { useTranslation } from '@/hooks/useTranslation';

export default function AccountsPage() {
  const { t } = useTranslation();

  const [accountsQuery] = useQuery({
    query: query((query) => [query.accounts((account) => [account.id, account.name])]),
  });

  return (
    <Page title={t('components:AccountsPage.Page.title')}>
      <Section title={t('components:AccountsPage.sections.newAccount')}>
        <CreateAccountForm />
      </Section>

      <Section title={t('components:AccountsPage.sections.accounts')}>
        {match(accountsQuery)
          .with({ fetching: true }, () => <Loading />)
          .with({ error: P.nonNullable }, () => <UnexpectedErrorAlert />)
          .when(
            (accountsQuery) => accountsQuery.data?.accounts?.length === 0,
            () => <EmptyState />,
          )
          .otherwise((accountsQuery) =>
            accountsQuery.data?.accounts?.map((account) => (
              <div key={account.id}>
                <Link href={routes.accounts.posts.index({ account: account.id })}>
                  {account.id} - {account.name}
                </Link>
              </div>
            )),
          )}
      </Section>
    </Page>
  );
}
