import { RootFieldBuilder, SchemaTypes } from '@pothos/core';
import { getOrCreatePaginationInputTypeRef } from './getOrCreatePaginationInputTypeRef';
import { getOrCreateTypeWithAggregationRef } from './getOrCreateTypeWithAggregationRef';

const rootBuilderProto = RootFieldBuilder.prototype as unknown as PothosSchemaTypes.RootFieldBuilder<SchemaTypes, unknown, 'Query' | 'Object'>;

const upperCaseFirst = (input: string) => input.charAt(0).toUpperCase() + input.slice(1);

rootBuilderProto.paginatedField = function (fieldOptions) {
  if (!Array.isArray(fieldOptions.type) || typeof fieldOptions.type[0] !== 'object' || !('name' in fieldOptions.type[0])) {
    // eslint-disable-next-line no-restricted-syntax
    throw new Error(`Type of field with pagination must be list e.g. type: [SomeType]`);
  }

  const paginationInputTypeRef = getOrCreatePaginationInputTypeRef({ builder: this.builder, name: 'PaginationInput' });

  const typeWithAggregationRef = getOrCreateTypeWithAggregationRef({
    builder: this.builder,
    name: upperCaseFirst(`Paginated${fieldOptions.type[0].name}s`),
    type: fieldOptions.type,
  });

  const paginationArgsGroup = { filter: this.arg({ type: paginationInputTypeRef, required: false }) };

  return this.field({ ...fieldOptions, type: typeWithAggregationRef, args: { ...fieldOptions.args, ...paginationArgsGroup } } as never);
};
