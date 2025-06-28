import { InputFieldBuilder, RootFieldBuilder, SchemaTypes } from '@pothos/core';
import { upperCaseFirst } from 'upper-case-first';
import { usePaginationBuilder } from './usePaginationBuilder';

const rootBuilderProto = RootFieldBuilder.prototype as PothosSchemaTypes.RootFieldBuilder<SchemaTypes, unknown>;

rootBuilderProto.fieldWithPagination = function (fieldOptions: { type: any }) {
  const { typeWithAggregationRef, paginationArgsGroup } = usePaginationBuilder({
    builder: this.builder,
    arg: this.arg,
    type: fieldOptions.type,
  });

  return this.field({ ...fieldOptions, type: typeWithAggregationRef, args: { ...paginationArgsGroup } } as never);
};
