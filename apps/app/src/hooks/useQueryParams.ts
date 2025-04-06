import { useRouter } from 'next/router';
import { z } from 'zod';

const querySchema = z.object({
  workspaceId: z.string(),
});

export type QueryParams = z.infer<typeof querySchema>;
export type QueryParamKeys = keyof QueryParams;

export const QueryParamOptions = {
  workspaceId: true,
} as const;

type QueryOptions = Partial<Record<QueryParamKeys, boolean>>;

export function useQueryParams<R extends QueryOptions>(required: R): Pick<QueryParams, keyof R & QueryParamKeys>;

export function useQueryParams<R extends QueryOptions, O extends QueryOptions>(
  required: R,
  optional: O,
): Pick<QueryParams, keyof R & QueryParamKeys> & Partial<Pick<QueryParams, keyof O & QueryParamKeys>>;

export function useQueryParams<R extends QueryOptions, O extends QueryOptions>(required: R, optional?: O) {
  const router = useRouter();
  const query = router.query;

  const optionalObj = optional || ({} as O);

  const requiredKeys = Object.keys(required).filter((key) => required[key as keyof R]) as Array<keyof R>;
  const optionalKeys = Object.keys(optionalObj).filter((key) => optionalObj[key as keyof O]) as Array<keyof O>;

  const requiredSchema = querySchema.pick(Object.fromEntries(requiredKeys.map((k) => [k, true])));
  const optionalSchema = querySchema.pick(Object.fromEntries(optionalKeys.map((k) => [k, true]))).partial();

  const schema = requiredSchema.merge(optionalSchema);
  const validatedQuery = schema.safeParse(query);

  if (!validatedQuery.success) {
    throw new Error(`Query validation failed in useQueryParams hook: ${validatedQuery.error.message}`);
  }

  return validatedQuery.data;
}
