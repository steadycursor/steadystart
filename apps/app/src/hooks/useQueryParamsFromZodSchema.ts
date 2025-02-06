import { useRouter } from 'next/router';
import { z, ZodSchema } from 'zod';

export const useQueryParamsFromZodSchema = <T extends ZodSchema>(schema: T): z.infer<T> => {
  const router = useRouter();

  const validatedQuery = schema.safeParse(router.query);

  if (!validatedQuery.success) {
    throw new Error('Query validation failed in useZodRouterQuery. Check console for more information.', validatedQuery.error);
  }

  return validatedQuery.data;
};
