import { PaginatedPrisma } from '../../prisma';

type FindOrCreateUserArgs = {
  clerkUserId: string;
  emailAddress: string;
  prisma: PaginatedPrisma;
};
export const findOrCreateUser = async ({ clerkUserId, emailAddress, prisma }: FindOrCreateUserArgs) => {
  const user = await prisma.user.findFirst({ where: { clerkId: clerkUserId } });

  if (user) {
    return user;
  }

  return prisma.user.create({ data: { clerkId: clerkUserId, email: emailAddress } });
};
