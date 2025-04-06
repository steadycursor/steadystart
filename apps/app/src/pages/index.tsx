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
import { CreateWorkspaceForm } from '@/forms/CreateWorkspaceForm';
import { query } from '@/generated/typed-graphql-builder';
import { useTranslation } from '@/hooks/useTranslation';
import { useUrqlContext } from '@/hooks/useUrqlContext';

export default function WorkspacesPage() {
  const { t } = useTranslation();

  const [workspacesQuery] = useQuery({
    query: query((query) => [query.workspaces((workspace) => [workspace.id, workspace.title])]),
    context: useUrqlContext({ additionalTypenames: ['Workspace'] }),
  });

  return (
    <Page title={t('components:WorkspacesPage.Page.title')}>
      <Section title={t('components:WorkspacesPage.sections.newWorkspace')}>
        <CreateWorkspaceForm />
      </Section>

      <Section title={t('components:WorkspacesPage.sections.workspaces')}>
        {match(workspacesQuery)
          .with({ error: P.nonNullable }, () => <UnexpectedErrorAlert />)
          .when(
            (workspacesQuery) => workspacesQuery.data?.workspaces?.length === 0,
            () => <EmptyState />,
          )
          .otherwise((workspacesQuery) => (
            <DataTable
              columns={[
                {
                  accessorKey: 'title',
                  header: t('fields:title'),
                  cell: (props) => (
                    <Link href={routes.workspaces.posts.index({ workspaceId: props.row.original.id })}>
                      <LinkButton>{props.row.original.title}</LinkButton>
                    </Link>
                  ),
                },
              ]}
              data={workspacesQuery.data?.workspaces || []}
              isFetching={workspacesQuery.fetching}
            />
          ))}
      </Section>
    </Page>
  );
}
