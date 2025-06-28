// import './types';
// import './schemaBuilder';

// import { paginate } from '@fleek-platform/prisma';
// import SchemaBuilder, { BasePlugin, SchemaTypes } from '@pothos/core';
// import { GraphQLFieldResolver } from 'graphql';

// const pluginName = 'inputGroup' as const;

// // eslint-disable-next-line import/no-default-export
// export default pluginName;

// export class PothosWithInputPlugin<Types extends SchemaTypes> extends BasePlugin<Types> {
//   wrapResolve(resolver: GraphQLFieldResolver<unknown, Types['Context'], object, Promise<ReturnType<typeof paginate> | string>>): GraphQLFieldResolver<
//     unknown,
//     Types['Context'],
//     {
//       filter?: { sortField: string; sortOrder: string; take: number; page?: number };
//     }
//   > {
//     return async (parent, args, context, info) => {
//       const result = await resolver(parent, args, context, info);

//       if (typeof result === 'object' && result !== null && 'withPages' in result && typeof result.withPages === 'function') {
//         const [data, paginationMetadata] = await result.withPages({
//           limit: args.filter?.take ?? 100,
//           page: args.filter?.page ?? 1,
//           includePageCount: true,
//         });

//         return { data, ...paginationMetadata };
//       }

//       return result;
//     };
//   }
// }

// SchemaBuilder.registerPlugin(pluginName, PothosWithInputPlugin);
