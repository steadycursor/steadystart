import { User } from '@steadystart/prisma';
import { prisma } from '../../prisma';
import { Request } from '../../types/Request';

type FindAndValidateAccountFromRequstHeadersArgs = {
  request: Request;
  user?: User | null;
};

export const findAndValidateAccountFromRequstHeaders = async ({ request, user }: FindAndValidateAccountFromRequstHeadersArgs) => {
  const id = request.headers.get('account');

  if (!id) {
    return;
  }

  if (!user) {
    return;
  }

  return prisma.account.findUnique({ where: { id } });
};
