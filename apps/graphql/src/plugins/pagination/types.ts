// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable fleek-custom/no-interface */
// import { paginate } from '@fleek-platform/prisma';
// import {
//   FieldKind,
//   FieldNullability,
//   FieldRef,
//   InputFieldMap,
//   InputFieldRef,
//   InputShapeFromFields,
//   MaybePromise,
//   SchemaTypes,
//   ShapeFromTypeParam,
//   TypeParam,
// } from '@pothos/core';
// import { GraphQLResolveInfo } from 'graphql';
// import type { PothosWithInputPlugin } from './plugin';

// type Sortable = {
//   fields: string[];
//   defaultField: string;
//   defaultOrder: 'asc' | 'desc';
// };

// type PartialArgs<Args, ArgRequired, Key extends string> = Args extends undefined
//   ? object
//   : {
//       [key in Key]: InputFieldRef<InputShapeFromFields<Args & NonNullable<unknown>> | (true extends ArgRequired ? never : null | undefined)>;
//     };

// type PaginationArgs<PaginationFlag> = PaginationFlag extends true
//   ? {
//       filter?: InputFieldRef<{ sortField: string; sortOrder: string; take: number; page?: number; match: string }>;
//     }
//   : NonNullable<unknown>;

// type FieldWithPaginationOptionsFromKind<
//   Types extends SchemaTypes,
//   ParentShape,
//   Type extends TypeParam<Types>,
//   Nullable extends FieldNullability<Type>,
//   Args extends InputFieldMap,
//   Kind extends 'Query' | 'Mutation' | 'Object',
//   _ResolveShape,
//   ResolveReturnShape,
//   PaginationFlag,
// > = FieldWithPaginationOptionsByKind<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape, PaginationFlag>[Kind];

// interface FieldWithPaginationOptionsByKind<
//   Types extends SchemaTypes,
//   ParentShape,
//   Type extends TypeParam<Types>,
//   Nullable extends FieldNullability<Type>,
//   Args extends InputFieldMap,
//   ResolveReturnShape,
//   PaginationFlag,
// > {
//   Query: QueryFieldOptions<Types, Type, Nullable, Args, ResolveReturnShape, PaginationFlag>;
//   Mutation: MutationFieldOptions<Types, Type, Nullable, Args, ResolveReturnShape, PaginationFlag>;
//   Object: ObjectFieldOptions<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape, PaginationFlag>;
// }

// interface QueryFieldOptions<
//   Types extends SchemaTypes,
//   Type extends TypeParam<Types>,
//   Nullable extends FieldNullability<Type>,
//   Args extends InputFieldMap,
//   ResolveReturnShape,
//   PaginationFlag,
// > extends Omit<PothosSchemaTypes.FieldOptions<Types, Types['Root'], Type, Nullable, Args, Types['Root'], ResolveReturnShape>, 'resolve'> {
//   resolve: Resolver<Types['Root'], InputShapeFromFields<Args>, Types['Context'], ShapeFromTypeParam<Types, Type, Nullable>, PaginationFlag, Nullable>;
// }

// interface MutationFieldOptions<
//   Types extends SchemaTypes,
//   Type extends TypeParam<Types>,
//   Nullable extends FieldNullability<Type>,
//   Args extends InputFieldMap,
//   ResolveReturnShape,
//   PaginationFlag,
// > extends Omit<PothosSchemaTypes.FieldOptions<Types, Types['Root'], Type, Nullable, Args, Types['Root'], ResolveReturnShape>, 'resolve'> {
//   resolve: Resolver<Types['Root'], InputShapeFromFields<Args>, Types['Context'], ShapeFromTypeParam<Types, Type, Nullable>, PaginationFlag, Nullable>;
// }

// interface ObjectFieldOptions<
//   Types extends SchemaTypes,
//   ParentShape,
//   Type extends TypeParam<Types>,
//   Nullable extends FieldNullability<Type>,
//   Args extends InputFieldMap,
//   ResolveReturnShape,
//   PaginationFlag,
// > extends Omit<PothosSchemaTypes.FieldOptions<Types, ParentShape, Type, Nullable, Args, ParentShape, ResolveReturnShape>, 'resolve'> {
//   resolve: Resolver<ParentShape, InputShapeFromFields<Args>, Types['Context'], ShapeFromTypeParam<Types, Type, Nullable>, PaginationFlag, Nullable>;
// }

// type Resolver<Parent, Args, Context, Type, PaginationFlag, Nullable> = (
//   parent: Parent,
//   args: Args,
//   context: Context,
//   info: GraphQLResolveInfo,
//   type: Type,
// ) => PaginationFlag extends true
//   ? Type extends readonly any[]
//     ? Nullable extends true
//       ? MaybePromise<ReturnType<typeof paginate<any, any, Type[number][]>> | null | undefined>
//       : MaybePromise<ReturnType<typeof paginate<any, any, Type[number][]>>>
//     : never
//   : MaybePromise<Type>;

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   export namespace PothosSchemaTypes {
//     export interface Plugins<Types extends SchemaTypes> {
//       inputGroup: PothosWithInputPlugin<Types>;
//     }

//     export interface RootFieldBuilder<Types extends SchemaTypes, ParentShape, Kind extends FieldKind = FieldKind> {
//       input: InputFieldBuilder<Types, 'InputObject'>;
//       fieldWithInputGroup: <
//         WhereArgs extends Record<string, InputFieldRef<unknown, 'InputObject'>> | undefined,
//         DataArgs extends Record<string, InputFieldRef<unknown, 'InputObject'>> | undefined,
//         PaginationFlag extends boolean,
//         Type extends TypeParam<Types>,
//         ResolveShape,
//         ResolveReturnShape,
//         ArgRequired extends boolean,
//         Nullable extends FieldNullability<Type> = Types['DefaultFieldNullability'],
//       >(
//         options: Omit<
//           FieldWithPaginationOptionsFromKind<
//             Types,
//             ParentShape,
//             Type,
//             Nullable,
//             PartialArgs<WhereArgs, ArgRequired, 'where'> & PartialArgs<DataArgs, ArgRequired, 'data'> & PaginationArgs<PaginationFlag>,
//             Extract<Kind, 'Query' | 'Mutation'>,
//             ResolveShape,
//             ResolveReturnShape,
//             PaginationFlag
//           >,
//           'args'
//         > & {
//           args: {
//             pagination: PaginationFlag;
//             sortable?: Sortable;
//             where?: WhereArgs;
//             whereRequired?: boolean;
//             data?: DataArgs;
//             dataRequired?: boolean;
//           };
//         },
//       ) => FieldRef<ShapeFromTypeParam<Types, Type, Nullable>>;
//       fieldWithPagination: <
//         Type extends TypeParam<Types>,
//         ResolveShape,
//         ResolveReturnShape,
//         Nullable extends FieldNullability<Type> = Types['DefaultFieldNullability'],
//       >(
//         options: Omit<
//           FieldWithPaginationOptionsFromKind<
//             Types,
//             ParentShape,
//             Type,
//             Nullable,
//             PaginationArgs<true>,
//             Kind extends 'Object' ? 'Object' : never,
//             ResolveShape,
//             ResolveReturnShape,
//             true
//           >,
//           'args'
//         >,
//       ) => FieldRef<ShapeFromTypeParam<Types, Type, Nullable>>;
//     }
//   }
// }
