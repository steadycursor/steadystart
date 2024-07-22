import { prisma } from './prisma';
import { Request } from './types/Request';

type ContextProps = {
  req: Request;
};

export const context = async ({ req }: ContextProps) => {
  return {
    request: req,
    prisma,
  };
};

export type Context = Awaited<ReturnType<typeof context>>;
