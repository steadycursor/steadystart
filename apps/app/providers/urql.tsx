import { Client, cacheExchange, fetchExchange, Provider } from 'urql';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useQueryParamsFromZodSchema } from '@/hooks/useQueryParamsFromZodSchema';
import { ChildrenProps } from '@/types/ChildrenProps';
import zod from 'zod';

const createClient = (args: { token: string | undefined; accountId: string | undefined }) =>
  new Client({
    url: '/api/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: { headers: { Authorization: args.token ? `Bearer ${args.token}` : '', Account: args.accountId ?? '' } },
  });

type UrqlProviderProps = ChildrenProps;

export const UrqlProvider = ({ children }: UrqlProviderProps) => {
  const queryParams = useQueryParamsFromZodSchema(zod.object({ account: zod.string().optional() }));

  const { getToken } = useAuth();

  const [client, setClient] = useState(createClient({ token: undefined, accountId: queryParams.account }));

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();

      if (token) {
        setClient(createClient({ token, accountId: queryParams.account }));
      }
    };

    fetchToken();
  }, [getToken, queryParams.account]);

  return <Provider value={client}>{children}</Provider>;
};
