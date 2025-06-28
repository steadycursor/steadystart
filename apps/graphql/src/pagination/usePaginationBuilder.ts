import { ArgBuilder, OutputType, SchemaTypes, TypeParam } from '@pothos/core';
import { upperCaseFirst } from 'upper-case-first';

type UsePaginationBuilderArgs = {
  builder: PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
  arg: ArgBuilder<SchemaTypes>;
  type: TypeParam<SchemaTypes>;
};

export const usePaginationBuilder = ({ builder, arg, type }: UsePaginationBuilderArgs) => {
  if (!Array.isArray(type) || typeof type[0] !== 'object' || !('name' in type[0])) {
    // eslint-disable-next-line fleek-custom/no-default-error
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

type GetOrCreatePaginationInputTypeRefArgs = {
  builder: PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
  name: string;
};

const getOrCreatePaginationInputTypeRef = ({ builder, name }: GetOrCreatePaginationInputTypeRefArgs) => {
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

type GetOrCreateTypeWithAggregationRefArgs = {
  builder: PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
  name: string;
  type: TypeParam<SchemaTypes>;
};

const getOrCreateTypeWithAggregationRef = ({ builder, name, type }: GetOrCreateTypeWithAggregationRefArgs) => {
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
