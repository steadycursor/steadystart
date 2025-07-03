import './global-types';
import './schemaBuilder';

import SchemaBuilder, { BasePlugin, SchemaTypes } from '@pothos/core';
import { PaginationArgs, PaginationResult } from '@steadystart/prisma';
import { GraphQLFieldResolver } from 'graphql';

const pluginName = 'pagination' as const;

function isPaginationResult(result: unknown): result is (args: PaginationArgs) => Promise<PaginationResult<unknown>> {
  return typeof result === 'function';
}

// eslint-disable-next-line import/no-default-export
export default class PaginationPlugin<Types extends SchemaTypes> extends BasePlugin<Types> {
  wrapResolve(resolver: GraphQLFieldResolver<unknown, Types['Context'], object, Promise<unknown>>): GraphQLFieldResolver<
    unknown,
    Types['Context'],
    {
      filter?: { size: number; page?: number };
    }
  > {
    return async (parent, args, context, info) => {
      const result = await resolver(parent, args, context, info);

      if (isPaginationResult(result)) {
        return result({
          size: args.filter?.size ?? 100,
          page: args.filter?.page ?? 1,
        });
      }

      return result;
    };
  }
}

SchemaBuilder.registerPlugin(pluginName, PaginationPlugin);
