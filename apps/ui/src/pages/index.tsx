import { Page } from '../components/Page';
import { useQuery } from 'urql';
import { query } from '@/generated/typed-graphql-builder';
import { CreateAccountForm } from '@/forms/CreateAccountForm';
import { match, P } from 'ts-pattern';
import Link from 'next/link';
import { useUrqlContext } from '@/hooks/useUrqlContext';

export default function AccountsPage() {
  const [accountsQuery] = useQuery({
    query: query((query) => [query.accounts((account) => [account.id, account.name])]),
    context: useUrqlContext({ additionalTypenames: ['Account'] }),
  });

  return (
    <Page title="Accounts">
      <h2>New Account</h2>
      <CreateAccountForm />
      <h2>Existing Accounts</h2>
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
              <Link href={`/accounts/${account.id}/posts`}>
                {account.id} - {account.name}
              </Link>
            </div>
          )),
        )}
    </Page>
  );
}
