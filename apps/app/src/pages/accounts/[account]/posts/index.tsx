import { Page } from '../../../../components/Page';
import { useQuery } from 'urql';
import { query } from '@/generated/typed-graphql-builder';
import { CreatePostForm } from '@/forms/CreatePostForm';
import { EmptyState } from '@/components/EmptyState';
import { match, P } from 'ts-pattern';
import { useUrqlContext } from '@/hooks/useUrqlContext';
import { UnexpectedErrorAlert } from '@/components/UnexpectedErrorAlert';
import { Alert } from '@/components/Alert';
import { Section } from '@/components/Section';
import { Loading } from '@/components/Loading';

export default function PostsPage() {
  const [postsQuery] = useQuery({
    query: query((query) => [query.posts((post) => [post.id, post.name])]),
    // context: useUrqlContext({ additionalTypenames: ['Post'] }),
  });

  return (
    <Page title="Posts">
      <Section title="New post">
        <CreatePostForm />
      </Section>

      <Section title="Posts">
        {match(postsQuery)
          .with({ fetching: true }, () => <Loading />)
          .with({ error: P.nonNullable }, () => <UnexpectedErrorAlert />)
          .when(
            (postsQuery) => postsQuery.data?.posts?.length === 0,
            () => <EmptyState />,
          )
          .otherwise((postsQuery) => postsQuery.data?.posts?.map((post) => <div key={post.id}>{post.name}</div>))}
      </Section>
    </Page>
  );
}
