import { Prisma, PrismaClient as OriginalPrismaClient } from '../generated';

export * from '../generated';

export type PaginationArgs<C> = {
  /** An index of page you want to get starting at 1. */
  page: number;
  /** A number of rows on each page. */
  size: number;
  /** Optional `cursor` object where key must be an unique, sequential column. */
  cursor?: C;
};

export type PaginationResult<R> = {
  /** A requested index of a page you wanted to get starting at 1. */
  page: number;
  /** A requested number of rows on each page */
  size: number;
  rows: R[];
  /** A total number of rows that match all `where` conditions. It equals to a table size if no `where` conditions are specified. */
  totalSize: number;
};

type PrismaPaginationFnBrandedType = { __type: 'PrismaPaginationFn' };

export type PrismaPaginationFn<TCursor, TResult> = (
  paginationArgs: PaginationArgs<TCursor>,
) => Promise<PaginationResult<TResult>> & PrismaPaginationFnBrandedType;

type PrismaPaginationFnInternal<
  TModel,
  TArgs = Prisma.Args<TModel, 'findMany'>,
  TResult = Prisma.Result<TModel, TArgs, 'findMany'>,
> = PrismaPaginationFn<Prisma.Args<TModel, 'findMany'>['cursor'], TResult>;

export const createPrismaClient = (prismaClientOptions: Prisma.PrismaClientOptions) => {
  const paginationExtension = Prisma.defineExtension((prisma) =>
    prisma.$extends({
      model: {
        $allModels: {
          paginate<T, A = Omit<Prisma.Args<T, 'findMany'>, 'take' | 'skip' | 'cursor'>>(this: T, args: A): PrismaPaginationFnInternal<T> {
            const context: any = Prisma.getExtensionContext(this);

            return (async ({ page, size, cursor }: PaginationArgs<Prisma.Args<T, 'findMany'>['cursor']>) => {
              const take = Math.max(0, size);
              let skip = (1 - Math.max(1, page)) * size;

              // We skip cursor itself that is the first returned row
              if (cursor) {
                skip += 1;
              }

              const [rows, totalSize] = await prisma.$transaction([context.findMany({ ...args, take, skip, cursor }), context.count(args)]);

              return { page, size, rows, totalSize };
            }) as PrismaPaginationFnInternal<T>;
          },
        },
      },
    }),
  );

  return new OriginalPrismaClient(prismaClientOptions).$extends(paginationExtension);
};

export type PrismaClient = ReturnType<typeof createPrismaClient>;
