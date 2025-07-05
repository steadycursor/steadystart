import { OutputType, SchemaTypes, TypeParam } from '@pothos/core';

export type GetOrCreateTypeWithAggregationRefArgs = {
  builder: PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
  name: string;
  type: TypeParam<SchemaTypes>;
};

export const getOrCreateTypeWithAggregationRef = ({ builder, name, type }: GetOrCreateTypeWithAggregationRefArgs): OutputType<SchemaTypes> => {
  const originalRef = builder.configStore.getOutputTypeRef(name);

  if (typeof originalRef !== 'string') {
    return originalRef;
  }

  return builder.simpleObject(name, {
    fields: (t) => ({
      page: t.field({ type: 'Int' }),
      size: t.field({ type: 'Int' }),
      totalSize: t.field({ type: 'Int' }),
      rows: t.field({
        type,
      }),
    }),
  });
};
