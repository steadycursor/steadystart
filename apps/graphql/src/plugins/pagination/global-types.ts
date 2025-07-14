import { FieldKind, FieldNullability, FieldRef, SchemaTypes, ShapeFromTypeParam, TypeParam } from '@pothos/core';
import { PaginationPlugin } from './index';
import { PaginatedField, PaginationFieldOptions, PaginationPluginOptions } from './types';

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      pagination: PaginationPlugin<Types>;
    }

    export interface SchemaBuilderOptions<Types extends SchemaTypes> {
      pagination?: PaginationPluginOptions;
    }

    export interface FieldOptions {
      pagination?: PaginationFieldOptions;
    }

    export interface RootFieldBuilder<Types extends SchemaTypes, ParentShape, Kind extends FieldKind = FieldKind> {
      paginatedField: <Type extends TypeParam<Types>, ResolveReturnShape, Nullable extends FieldNullability<Type> = Types['DefaultFieldNullability']>(
        options: PaginatedField<Types, ParentShape, Kind, Type, Nullable, ResolveReturnShape>,
      ) => FieldRef<Types, ShapeFromTypeParam<Types, Type, Nullable>>;
    }
  }
}
