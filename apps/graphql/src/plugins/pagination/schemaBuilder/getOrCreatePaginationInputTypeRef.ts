import { ArgBuilder, OutputType, SchemaTypes, TypeParam } from '@pothos/core';

export type GetOrCreatePaginationInputTypeRefArgs = {
  builder: PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
  name: string;
};

export const getOrCreatePaginationInputTypeRef = ({ builder, name }: GetOrCreatePaginationInputTypeRefArgs) => {
  const originalRef = builder.configStore.getInputTypeRef(name);

  if (typeof originalRef !== 'string') {
    return originalRef;
  }

  return builder.inputType(name, {
    fields: (t) => ({
      take: t.int(),
      page: t.int({ required: false }),
    }),
  });
};
