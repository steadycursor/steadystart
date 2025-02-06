import { Page } from '../components/Page';
import { useQuery } from 'urql';
import { query } from '@/generated/typed-graphql-builder';
import { Section } from '@/components/Section';
import { CreateAccountForm } from '@/forms/CreateAccountForm';
import { match, P } from 'ts-pattern';
import Link from 'next/link';
import { routes } from '@steadysass/routes';

export default function AccountsPage() {
  const [accountsQuery] = useQuery({
    query: query((query) => [query.accounts((account) => [account.id, account.name])]),
  });

  return (
    <Page title="Accounts">
      <Section title="New Account">
        <CreateAccountForm />
      </Section>

      <Section title="Accounts">
        {match(accountsQuery)
          .with({ fetching: true }, () => <div>Loading</div>)
          .with({ error: P.nonNullable }, () => <div>Error</div>)
          .when(
            (accountsQuery) => accountsQuery.data?.accounts?.length === 0,
            () => <div>Empty</div>,
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
