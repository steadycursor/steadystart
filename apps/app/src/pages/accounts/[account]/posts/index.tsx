import { match, P } from 'ts-pattern';
import { useQuery } from 'urql';
import { Page } from '../../../../components/Page';
import { EmptyState } from '@/components/EmptyState';
import { Section } from '@/components/Section';
import { DataTable } from '@/components/Table';
import { UnexpectedErrorAlert } from '@/components/UnexpectedErrorAlert';
import { CreatePostForm } from '@/forms/CreatePostForm';
import { query } from '@/generated/typed-graphql-builder';
import { useTranslation } from '@/hooks/useTranslation';
import { useUrqlContext } from '@/hooks/useUrqlContext';

export default function PostsPage() {
  const { t } = useTranslation();

  const [postsQuery] = useQuery({
    query: query((query) => [query.posts((post) => [post.id, post.name])]),
    context: useUrqlContext({ additionalTypenames: ['Post'] }),
  });

  return (
    <Page title={t('components:PostsPage.Page.title')}>
      <Section title={t('components:PostsPage.sections.newPost')}>
        <CreatePostForm />
      </Section>

      <Section title={t('components:PostsPage.sections.posts')}>
        {match(postsQuery)
          .with({ error: P.nonNullable }, () => <UnexpectedErrorAlert />)
          .when(
            (postsQuery) => postsQuery.data?.posts?.length === 0,
            () => <EmptyState />,
          )
          .otherwise((postsQuery) => (
            <DataTable
              columns={[
                {
                  accessorKey: 'name',
                  header: 'Name',
                },
              ]}
              data={
                postsQuery.data?.posts.map((post) => ({
                  id: post.id,
                  name: post.name,
                })) || []
              }
              isFetching={postsQuery.fetching}
            />
          ))}
      </Section>
    </Page>
  );
}
