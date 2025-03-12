import { Page } from '../../../../components/Page';
import { useQuery } from 'urql';
import { query } from '@/generated/typed-graphql-builder';
import { CreatePostForm } from '@/forms/CreatePostForm';
import { EmptyState } from '@/components/EmptyState';
import { match, P } from 'ts-pattern';
import { UnexpectedErrorAlert } from '@/components/UnexpectedErrorAlert';
import { Section } from '@/components/Section';
import { useTranslation } from '@/hooks/useTranslation';
import { DataTable } from '@/components/Table';
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
