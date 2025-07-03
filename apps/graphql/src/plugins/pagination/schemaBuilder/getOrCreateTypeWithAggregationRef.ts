import { ArgBuilder, OutputType, SchemaTypes, TypeParam } from '@pothos/core';

export type GetOrCreateTypeWithAggregationRefArgs = {
  builder: PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
  name: string;
  type: TypeParam<SchemaTypes>;
};

export const getOrCreateTypeWithAggregationRef = ({ builder, name, type }: GetOrCreateTypeWithAggregationRefArgs) => {
  const originalRef = builder.configStore.getOutputTypeRef(name);

  if (typeof originalRef !== 'string') {
    return originalRef as OutputType<SchemaTypes>;
  }

  return builder.simpleObject(name, {
    fields: (t) => ({
      currentPage: t.field({ type: 'Int' }),
      isFirstPage: t.field({ type: 'Boolean' }),
      isLastPage: t.field({ type: 'Boolean' }),
      previousPage: t.field({ type: 'Int', nullable: true }),
      nextPage: t.field({ type: 'Int', nullable: true }),
      pageCount: t.field({ type: 'Int' }),
      totalCount: t.field({ type: 'Int' }),
      data: t.field({
        type,
      }),
    }),
  });
};
