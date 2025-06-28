import {
  FieldKind,
  FieldNullability,
  FieldRef,
  InputFieldMap,
  InputFieldRef,
  InputShapeFromFields,
  MaybePromise,
  SchemaTypes,
  ShapeFromTypeParam,
  TypeParam,
} from '@pothos/core';
import { GraphQLResolveInfo } from 'graphql';
import PaginationPlugin from './plugin';

type PartialArgs<Args, ArgRequired, Key extends string> = Args extends undefined
  ? object
  : {
      [key in Key]: InputFieldRef<InputShapeFromFields<Args & NonNullable<unknown>> | undefined>;
    };

type FieldWithPaginationOptionsFromKind<
  Types extends SchemaTypes,
  ParentShape,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  Kind extends 'Query' | 'Mutation' | 'Object',
  _ResolveShape,
  ResolveReturnShape,
> = FieldWithPaginationOptionsByKind<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape>[Kind];

interface FieldWithPaginationOptionsByKind<
  Types extends SchemaTypes,
  ParentShape,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> {
  Query: QueryFieldOptions<Types, Type, Nullable, Args, ResolveReturnShape>;
  Mutation: MutationFieldOptions<Types, Type, Nullable, Args, ResolveReturnShape>;
  Object: ObjectFieldOptions<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape>;
}

interface QueryFieldOptions<
  Types extends SchemaTypes,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> extends Omit<PothosSchemaTypes.FieldOptions<Types, Types['Root'], Type, Nullable, Args, Types['Root'], ResolveReturnShape>, 'resolve'> {
  resolve: Resolver<Types['Root'], InputShapeFromFields<Args>, Types['Context'], ShapeFromTypeParam<Types, Type, Nullable>, Nullable>;
}

interface MutationFieldOptions<
  Types extends SchemaTypes,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> extends Omit<PothosSchemaTypes.FieldOptions<Types, Types['Root'], Type, Nullable, Args, Types['Root'], ResolveReturnShape>, 'resolve'> {
  resolve: Resolver<Types['Root'], InputShapeFromFields<Args>, Types['Context'], ShapeFromTypeParam<Types, Type, Nullable>, Nullable>;
}

interface ObjectFieldOptions<
  Types extends SchemaTypes,
  ParentShape,
  Type extends TypeParam<Types>,
  Nullable extends FieldNullability<Type>,
  Args extends InputFieldMap,
  ResolveReturnShape,
> extends Omit<PothosSchemaTypes.FieldOptions<Types, ParentShape, Type, Nullable, Args, ParentShape, ResolveReturnShape>, 'resolve'> {
  resolve: Resolver<ParentShape, InputShapeFromFields<Args>, Types['Context'], ShapeFromTypeParam<Types, Type, Nullable>, Nullable>;
}

type Resolver<Parent, Args, Context, Type, Nullable> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
  type: Type,
) => Type extends readonly any[]
  ? Nullable extends true
    ? MaybePromise<ReturnType<() => Promise<Type[number][]>> | null | undefined>
    : MaybePromise<ReturnType<() => Promise<Type[number][]>>>
  : never;

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      pagination: PaginationPlugin<Types>;
    }

    export interface RootFieldBuilder<Types extends SchemaTypes, ParentShape, Kind extends FieldKind = FieldKind> {
      paginatedField: <
        Type extends TypeParam<Types>,
        ResolveShape,
        ResolveReturnShape,
        Nullable extends FieldNullability<Type> = Types['DefaultFieldNullability'],
      >(
        options: Omit<
          FieldWithPaginationOptionsFromKind<
            Types,
            ParentShape,
            Type,
            Nullable,
            {
              filter?: InputFieldRef<{ size: number; page?: number }>;
            },
            Extract<Kind, 'Query' | 'Mutation'>,
            ResolveShape,
            ResolveReturnShape
          >,
          'args'
        >,
      ) => FieldRef<ShapeFromTypeParam<Types, Type, false>>;
    }
  }
}
