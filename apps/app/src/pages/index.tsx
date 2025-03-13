import { routes } from '@steadystart/routes';
import Link from 'next/link';
import { match, P } from 'ts-pattern';
import { useQuery } from 'urql';
import { Page } from '../components/Page';
import { EmptyState } from '@/components/EmptyState';
import { LinkButton } from '@/components/LinkButton';
import { Section } from '@/components/Section';
import { DataTable } from '@/components/Table';
import { UnexpectedErrorAlert } from '@/components/UnexpectedErrorAlert';
import { CreateAccountForm } from '@/forms/CreateAccountForm';
import { query } from '@/generated/typed-graphql-builder';
import { useTranslation } from '@/hooks/useTranslation';
import { useUrqlContext } from '@/hooks/useUrqlContext';

export default function AccountsPage() {
  const { t } = useTranslation();

  const [accountsQuery] = useQuery({
    query: query((query) => [query.accounts((account) => [account.id, account.name])]),
    context: useUrqlContext({ additionalTypenames: ['Account'] }),
  });

  return (
    <Page title={t('components:AccountsPage.Page.title')}>
      <Section title={t('components:AccountsPage.sections.newAccount')}>
        <CreateAccountForm />
      </Section>

      <Section title={t('components:AccountsPage.sections.accounts')}>
        {match(accountsQuery)
          .with({ error: P.nonNullable }, () => <UnexpectedErrorAlert />)
          .when(
            (accountsQuery) => accountsQuery.data?.accounts?.length === 0,
            () => <EmptyState />,
          )
          .otherwise((accountsQuery) => (
            <DataTable
              columns={[
                {
                  accessorKey: 'name',
                  header: 'Name',
                  cell: (props) => (
                    <Link href={routes.accounts.posts.index({ account: props.row.original.id })}>
                      <LinkButton>{props.row.original.name}</LinkButton>
                    </Link>
                  ),
                },
              ]}
              data={
                accountsQuery.data?.accounts.map((account) => ({
                  id: account.id,
                  name: account.name,
                })) || []
              }
              isFetching={accountsQuery.fetching}
            />
          ))}
      </Section>
    </Page>
  );
}
