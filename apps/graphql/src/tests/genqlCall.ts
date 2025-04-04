import { PrismaClient } from '@steadystart/prisma';
import { createContext } from '../context';
import { createClient, QueryRequest, QueryResult, MutationRequest, MutationResult } from '../generated/genql';
import { schema } from '../schema';
import { graphql } from 'graphql';

export type CreateClientWithContextArgs = {
  userId?: string;
  workspaceId?: string;
  prisma: PrismaClient;
};

export const createClientWithContext = async ({ prisma, workspaceId, userId }: CreateClientWithContextArgs) => {
  const context = await createContext({
    request: undefined,
    test: {
      prisma,
      userId,
      workspaceId,
    },
  }).catch((e) => {
    console.warn('Error when creating context in test graphqlCall function', JSON.stringify(e));

    throw new Error(e);
  });

  return createClient({
    fetcher: async (operation: any) => {
      return graphql({
        schema,
        variableValues: operation.variables,
        source: operation.query,
        contextValue: context,
      });
    },
  });
};

export async function genqlQuery<Q extends QueryRequest>({
  source,
  logResponseToConsole,
  ...props
}: CreateClientWithContextArgs & { source: Q; logResponseToConsole?: boolean }) {
  const client = await createClientWithContext(props);

  return client
    .query(source)
    .then((response) => {
      if (logResponseToConsole) {
        console.info(JSON.stringify(response));
      }

      return response as QueryResult<typeof source>;
    })
    .catch((e) => {
      if (logResponseToConsole) {
        console.warn(e.message);
      }

      return (e as unknown) as QueryResult<typeof source>;
    });
}

export async function genqlMutation<Q extends MutationRequest>({
  source,
  logResponseToConsole,
  ...props
}: CreateClientWithContextArgs & { source: Q; logResponseToConsole?: boolean }) {
  const client = await createClientWithContext(props);

  return client
    .mutation(source)
    .then((response) => {
      if (logResponseToConsole) {
        console.info(JSON.stringify(response));
      }

      return response as MutationResult<typeof source>;
    })
    .catch((e) => {
      if (logResponseToConsole) {
        console.warn(e.message);
      }

      return (e as unknown) as MutationResult<typeof source>;
    });
}
