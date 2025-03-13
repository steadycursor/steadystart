import { useRouter } from 'next/router';
import { z } from 'zod';

const querySchema = z.object({
  account: z.string(),
});

type QueryParams = z.infer<typeof querySchema>;

type QueryOptions = {
  [K in keyof QueryParams]?: true;
};

export const useQueryParams = <T extends QueryOptions>(options: T) => {
  const router = useRouter();
  const query = router.query;

  const validatedQuery = querySchema.pick(options).safeParse(query);

  if (!validatedQuery.success) {
    throw new Error(`Query validation failed in useQueryParams hook: ${validatedQuery.error.message}`);
  }

  return validatedQuery.data;
};
