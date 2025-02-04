import { useRouter } from 'next/router';
import { z } from 'zod';

const querySchema = z.object({
  account: z.string(),
});

type QuerySchema = {
  [K in keyof typeof querySchema.shape]: boolean;
};

type QueryOptions = {
  [K in keyof QuerySchema]?: true;
};

export const useQueryParams = <T extends QueryOptions>(options: T) => {
  const router = useRouter();
  const query = router.query;

  const validatedQuery = querySchema.pick(options).safeParse(query);

  if (!validatedQuery.success) {
    throw new Error('Query validation failed in useQueryParams hook.', validatedQuery.error);
  }

  return validatedQuery.data;
};
