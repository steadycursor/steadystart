import { useMemo } from 'react';
import { OperationContext } from 'urql';
import type { Account, User, Post } from '@/generated/graphql';

type ExtractTypename<T> = T extends { __typename: string } ? T['__typename'] : never;

export type AdditionalTypename = ExtractTypename<
  | Account //
  | User
  | Post
>;

export type UseUrqlContextArgs = Omit<OperationContext, 'url'> & {
  additionalTypenames?: AdditionalTypename[];
};

export const useUrqlContext = ({ additionalTypenames, ...args }: UseUrqlContextArgs) => {
  return useMemo(() => ({ additionalTypenames, ...args }), []);
};
