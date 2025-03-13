import { User } from '@steadystart/prisma';
import { prisma } from '../../prisma';
import { Request } from '../../types/Request';

type FindAndValidateWorkspaceFromRequestHeadersArgs = {
  request: Request;
  user?: User | null;
};

export const findAndValidateWorkspaceFromRequestHeaders = async ({ request, user }: FindAndValidateWorkspaceFromRequestHeadersArgs) => {
  const id = request.headers.get('workspace');

  if (!id) {
    return;
  }

  if (!user) {
    return;
  }

  return prisma.workspace.findUnique({ where: { id } });
};
