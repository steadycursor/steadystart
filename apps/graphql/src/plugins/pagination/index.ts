import './global-types';
import './schemaBuilder';

import SchemaBuilder, { BasePlugin, PothosOutputFieldConfig, SchemaTypes } from '@pothos/core';
import { PaginationArgs, PaginationResult, PrismaPaginationFn } from '@steadystart/prisma';
import { GraphQLFieldResolver } from 'graphql';

const pluginName = 'pagination' as const;

function isPaginationResult(result: unknown): result is (args: PaginationArgs<Record<string, unknown>>) => Promise<PaginationResult<unknown>> {
  return typeof result === 'function';
}

export class PaginationPlugin<Types extends SchemaTypes> extends BasePlugin<Types> {
  wrapResolve(
    resolver: GraphQLFieldResolver<unknown, Types['Context'], object, Promise<PrismaPaginationFn<unknown, unknown>>>,
    fieldConfig: PothosOutputFieldConfig<Types>,
  ): GraphQLFieldResolver<
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
          size: args.filter?.size ?? this.builder.options.pagination?.defaultPageSize ?? fieldConfig.pothosOptions.pagination?.defaultPageSize ?? 100,
          page: args.filter?.page ?? 1,
          cursor: undefined,
        });
      }

      return result;
    };
  }
}

SchemaBuilder.registerPlugin(pluginName, PaginationPlugin);

// eslint-disable-next-line import/no-default-export
export default pluginName;
