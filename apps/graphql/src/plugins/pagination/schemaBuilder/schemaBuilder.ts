import { RootFieldBuilder } from '@pothos/core';
import { usePaginationBuilder } from './usePaginationBuilder';

RootFieldBuilder.prototype.fieldWithPagination = function (fieldOptions: { type: any }) {
  const { typeWithAggregationRef, paginationArgsGroup } = usePaginationBuilder({
    builder: this.builder,
    arg: this.arg,
    type: fieldOptions.type,
  });

  return this.field({ ...fieldOptions, type: typeWithAggregationRef, args: { ...paginationArgsGroup } });
};
