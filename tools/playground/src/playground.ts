import { PrismaClient } from '@steadystart/prisma';

const prisma = new PrismaClient();

(async () => {
  const workspaces = await prisma.workspace.findMany();

  console.info(workspaces);
})();
