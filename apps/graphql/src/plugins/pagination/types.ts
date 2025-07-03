import {
  FieldKind,
  FieldNullability,
  FieldOptionsFromKind,
  InferredFieldOptionsByKind,
  InputFieldMap,
  InputFieldRef,
  InputShapeFromFields,
  MaybePromise,
  SchemaTypes,
  TypeParam,
} from '@pothos/core';

interface ObjectFieldOptions<
  Types extends SchemaTypes,
  ParentShape,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> extends FieldOptions<Types, ParentShape, Type, Nullable, Args, ParentShape, ResolveReturnShape> {}

export interface QueryFieldOptions<
  Types extends SchemaTypes,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> extends FieldOptions<Types, Types['Root'], Type, Nullable, Args, Types['Root'], ResolveReturnShape> {}

type FieldOptionsByKind<
  Types extends SchemaTypes,
  ParentShape,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> = {
  Query: QueryFieldOptions<Types, Type, Nullable, Args, ResolveReturnShape> &
    InferredFieldOptionsByKind<Types, Types['InferredFieldOptionsKind'], Types['Root'], Type, Nullable, Args, ResolveReturnShape>;
  Object: ObjectFieldOptions<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape> &
    InferredFieldOptionsByKind<Types, Types['InferredFieldOptionsKind'], ParentShape, Type, Nullable, Args, ResolveReturnShape>;
};

export type PaginatedField<
  Types extends SchemaTypes,
  ParentShape,
  Kind extends FieldKind,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  ResolveShape,
  ReturnResolveShape,
  PaginationEnabled extends boolean = false,
> = FieldOptionsByKind<Types, ParentShape, Type, Nullable, InputFieldMap, Kind, ResolveShape, ReturnResolveShape>[Kind] & {
  pagination: PaginationEnabled;
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
