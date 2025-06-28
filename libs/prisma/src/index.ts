import { Prisma, PrismaClient as OriginalPrismaClient } from '../generated';

export * from '../generated';

export type PaginationArgs = {
  /** An index of page you want to get starting at 1. */
  page: number;
  /** A number of rows on each page. */
  size: number;
};

export type PaginationResult<R> = {
  /** A requested index of a page you wanted to get starting at 1. */
  page: number;
  /** A requested number of rows on each page */
  size: number;
  rows: R;
  /** A total number of rows that match all `where` conditions. It equals to a table size if no `where` conditions are specified. */
  totalSize: number;
};

export const createPrismaClient = () =>
  new OriginalPrismaClient().$extends({
    model: {
      $allModels: {
        paginate<T, A extends Prisma.Args<T, 'findMany'>, R = Prisma.Result<T, A, 'findMany'>>(
          this: T,
          args: A,
        ): (paginationArgs: PaginationArgs) => Promise<PaginationResult<R>> {
          const context: any = Prisma.getExtensionContext(this);

          return async ({ page, size }: PaginationArgs) => {
            const take = Math.max(0, size);
            const skip = (1 - Math.max(1, page)) * size;

            const [rows, totalSize] = await context.$transaction([context.findMany({ ...args, take, skip }), context.count(args)]);

            return { page, size, rows, totalSize };
          };
        },
      },
    },
  });

export type PrismaClient = ReturnType<typeof createPrismaClient>;
