import { User, Workspace } from '@steadystart/prisma';
import { match } from 'ts-pattern';
import { findAndValidateWorkspaceFromRequestHeaders } from './findAndValidateWorkspaceFromRequestHeaders';
import { ContextProps } from '../../context';
import { PaginatedPrisma } from '../../prisma';

type ResolveWorkspaceFromContextArgs = ContextProps & {
  prisma: PaginatedPrisma;
  user: User | null;
};

export const resolveWorkspaceFromContext = async ({ request, prisma, user, test }: ResolveWorkspaceFromContextArgs): Promise<Workspace | null> => {
  return match({ request, test })
    .when(
      ({ request }) => !!request,
      async ({ request }) => {
        const workspace = await findAndValidateWorkspaceFromRequestHeaders({
          request: request!,
          user,
        });

        if (!workspace) {
          return null;
        }

        return workspace;
      },
    )
    .when(
      ({ test }) => !!test,
      async ({ test }) => {
        const id = test?.workspaceId;

        if (!id) {
          return null;
        }

        const workspace = await prisma.workspace.findUnique({ where: { id } });

        return workspace;
      },
    )
    .otherwise(() => null);
};
