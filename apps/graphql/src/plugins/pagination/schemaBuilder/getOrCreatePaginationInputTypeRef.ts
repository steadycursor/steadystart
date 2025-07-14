import { SchemaTypes } from '@pothos/core';

export type GetOrCreatePaginationInputTypeRefArgs = {
  builder: PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
  name: string;
};

export const getOrCreatePaginationInputTypeRef = ({ builder, name }: GetOrCreatePaginationInputTypeRefArgs) => {
  try {
    return builder.configStore.getInputTypeRef(name);
  } catch {
    return builder.inputType(name, {
      fields: (t) => ({
        size: t.int({ required: false }),
        page: t.int({ required: false }),
      }),
    });
  }
};
