import { PrismaClient } from '@steadystart/prisma';
import { graphql } from 'graphql';
import { createContext } from '../context';
import { createClient, QueryRequest, QueryResult, MutationRequest, MutationResult } from '../generated/genql';
import { schema } from '../schema';

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
  }).catch((error) => {
    console.warn('Error when creating context in test graphqlCall function', JSON.stringify(error));

    // eslint-disable-next-line no-restricted-syntax
    throw new Error(error);
  });

  return createClient({
    fetcher: async (operation: any) => {
      return graphql({
        schema,
        variableValues: Object.fromEntries(Object.entries(operation.variables).filter(([_, v]) => v !== undefined)),
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
