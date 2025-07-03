import { FieldKind, FieldNullability, FieldRef, SchemaTypes, ShapeFromTypeParam, TypeParam } from '@pothos/core';
import PaginationPlugin from './plugin';
import { PaginatedField } from './types';

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      pagination: PaginationPlugin<Types>;
    }

    export interface RootFieldBuilder<Types extends SchemaTypes, ParentShape, Kind extends FieldKind = FieldKind> {
      paginatedField: <
        Type extends TypeParam<Types>,
        ResolveShape,
        ReturnResolveShape,
        Nullable extends FieldNullability<Type> = Types['DefaultFieldNullability'],
      >(
        options: PaginatedField<Types, ParentShape, Kind, Type, Nullable, ResolveShape, ReturnResolveShape>,
      ) => FieldRef<Types, ShapeFromTypeParam<Types, Type, Nullable>>;
    }
  }
}
