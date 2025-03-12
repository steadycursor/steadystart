import { Page } from '../components/Page';
import { useQuery } from 'urql';
import { query } from '@/generated/typed-graphql-builder';
import { Section } from '@/components/Section';
import { CreateAccountForm } from '@/forms/CreateAccountForm';
import { useUrqlContext } from '@/hooks/useUrqlContext';
import { match, P } from 'ts-pattern';
import { UnexpectedErrorAlert } from '@/components/UnexpectedErrorAlert';
import Link from 'next/link';
import { routes } from '@steadystart/routes';
import { LinkButton } from '@/components/LinkButton';
import { EmptyState } from '@/components/EmptyState';
import { useTranslation } from '@/hooks/useTranslation';
import { DataTable } from '@/components/Table';

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
