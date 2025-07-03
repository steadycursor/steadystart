import { ArgBuilder, SchemaTypes, TypeParam } from '@pothos/core';
import { upperCaseFirst } from 'upper-case-first';
import { getOrCreatePaginationInputTypeRef } from './getOrCreatePaginationInputTypeRef';
import { getOrCreateTypeWithAggregationRef } from './getOrCreateTypeWithAggregationRef';

export type UsePaginationBuilderArgs = {
  builder: PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
  arg: ArgBuilder<SchemaTypes>;
  type: TypeParam<SchemaTypes>;
};

export const usePaginationBuilder = ({ builder, arg, type }: UsePaginationBuilderArgs) => {
  if (!Array.isArray(type) || typeof type[0] !== 'object' || !('name' in type[0])) {
    // eslint-disable-next-line no-restricted-syntax
    throw new Error(`Type of field with pagination must be list e.g. type: [SomeType]`);
  }

  const paginationInputTypeRef = getOrCreatePaginationInputTypeRef({ builder, name: 'PaginationInput' });

  const typeWithAggregationRef = getOrCreateTypeWithAggregationRef({
    builder,
    name: upperCaseFirst(`${type[0].name}sWithNestedAggregation`),
    type,
  });

  const paginationArgsGroup = { filter: arg({ required: false, type: paginationInputTypeRef }) };

  return {
    typeWithAggregationRef,
    paginationArgsGroup,
  };
};

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
