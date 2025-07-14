import {
  FieldKind,
  FieldNullability,
  InputFieldMap,
  InputShapeFromFields,
  MaybePromise,
  SchemaTypes,
  ShapeFromTypeParam,
  TypeParam,
} from '@pothos/core';
import { PrismaPaginationFn } from '@steadystart/prisma';
import { GraphQLResolveInfo } from 'graphql';

export type PaginationPluginOptions = {
  defaultPageSize?: number;
};

export type PaginationFieldOptions = {
  defaultPageSize?: number;
};

export interface ObjectFieldOptions<
  Types extends SchemaTypes,
  ParentShape,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> extends PothosSchemaTypes.FieldOptions<Types, ParentShape, Type, Nullable, Args, ParentShape, ResolveReturnShape> {}

export interface QueryFieldOptions<
  Types extends SchemaTypes,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> extends PothosSchemaTypes.FieldOptions<Types, Types['Root'], Type, Nullable, Args, Types['Root'], ResolveReturnShape> {}

type Resolver<Parent, Args, Context, Type> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => [Type] extends [readonly (infer Item)[] | null | undefined]
  ? MaybePromise<PrismaPaginationFn<any, Item[]>>
  : { __error: 'Pagination needs to be enable for lists only.' };

interface InferredFieldOptions<
  Types extends SchemaTypes,
  ResolveShape = unknown,
  Type extends TypeParam<Types> = TypeParam<Types>,
  Nullable extends FieldNullability<Type> = FieldNullability<Type>,
  Args extends InputFieldMap = InputFieldMap,
> {
  Resolve: {
    /**
     * Resolver function for this field
     * @param parent - The parent object for the current type
     * @param {object} args - args object based on the args defined for this field
     * @param {object} context - the context object for the current query, based on `Context` type provided to the SchemaBuilder
     * @param {GraphQLResolveInfo} info - info about how this field was queried
     */
    resolve: Resolver<ResolveShape, InputShapeFromFields<Args>, Types['Context'], ShapeFromTypeParam<Types, Type, Nullable>>;
  };
}

export type InferredFieldOptionsKind<Types extends SchemaTypes = SchemaTypes> = keyof InferredFieldOptions<Types>;

export type InferredFieldOptionsByKind<
  Types extends SchemaTypes,
  Kind extends InferredFieldOptionsKind,
  ResolveShape = unknown,
  Type extends TypeParam<Types> = TypeParam<Types>,
  Nullable extends FieldNullability<Type> = FieldNullability<Type>,
  Args extends InputFieldMap = InputFieldMap,
> = InferredFieldOptions<Types, ResolveShape, Type, Nullable, Args>[Kind];

export interface FieldOptionsByKind<
  Types extends SchemaTypes,
  ParentShape,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> {
  Query: QueryFieldOptions<Types, Type, Nullable, Args, ResolveReturnShape> &
    InferredFieldOptionsByKind<Types, Types['InferredFieldOptionsKind'], Types['Root'], Type, Nullable, Args>;
  Object: ObjectFieldOptions<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape> &
    InferredFieldOptionsByKind<Types, Types['InferredFieldOptionsKind'], ParentShape, Type, Nullable, Args>;
}

export type PaginatedField<
  Types extends SchemaTypes,
  ParentShape,
  Kind extends FieldKind,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  ResolveReturnShape,
  Args extends InputFieldMap = InputFieldMap,
> = Kind extends 'Query' | 'Object'
  ? FieldOptionsByKind<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape>[Kind]
  : { __error: 'Pagination needs to be used with Query or Object.' };
