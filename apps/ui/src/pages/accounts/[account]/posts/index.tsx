import { Page } from '../../../../components/Page';
import { useQuery } from 'urql';
import { query } from '@/generated/typed-graphql-builder';
import { CreatePostForm } from '@/forms/CreatePostForm';
import { match, P } from 'ts-pattern';
import { useUrqlContext } from '@/hooks/useUrqlContext';
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

      <Section title="Posts">
        {match(postsQuery)
          .with({ fetching: true }, () => <div>Loading</div>)
          .with({ error: P.nonNullable }, () => <div>Error</div>)
          .when(
            (postsQuery) => postsQuery.data?.posts?.length === 0,
            () => <div>Empty</div>,
          )
          .otherwise((postsQuery) => postsQuery.data?.posts?.map((post) => <div key={post.id}>{post.name}</div>))}
      </Section>
    </Page>
  );
}
