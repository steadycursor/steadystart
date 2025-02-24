import { Page } from '../../../../components/Page';
import { useQuery } from 'urql';
import { query } from '@/generated/typed-graphql-builder';
import { CreatePostForm } from '@/forms/CreatePostForm';
import { match, P } from 'ts-pattern';
import { useUrqlContext } from '@/hooks/useUrqlContext';
import { UnexpectedErrorAlert } from '@/components/UnexpectedErrorAlert';
import { Alert } from '@/components/Alert';
import { Section } from '@/components/Section';

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
      <Alert title="Hello!" variant={{ type: 'success' }}>
        Ahojs
      </Alert>

      <Section title="Posts">
        {match(postsQuery)
          .with({ fetching: true }, () => <div>Loading</div>)
          .with({ error: P.nonNullable }, () => <UnexpectedErrorAlert />)
          .when(
            (postsQuery) => postsQuery.data?.posts?.length === 0,
            () => <div>Empty</div>,
          )
          .otherwise((postsQuery) => postsQuery.data?.posts?.map((post) => <div key={post.id}>{post.name}</div>))}
      </Section>
    </Page>
  );
}
