import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { Client, cacheExchange, fetchExchange, Provider } from 'urql';
import { useQueryParams } from '@/hooks/useQueryParams';
import { ChildrenProps } from '@/types/ChildrenProps';

const createClient = (args: { token: string | undefined; workspaceId: string | undefined }) =>
  new Client({
    url: '/api/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: { headers: { Authorization: args.token ? `Bearer ${args.token}` : '', Workspace: args.workspaceId ?? '' } },
  });

type UrqlProviderProps = ChildrenProps;

export const UrqlProvider = ({ children }: UrqlProviderProps) => {
  const queryParams = useQueryParams({}, { workspaceId: true });

  const { getToken } = useAuth();

  const [client, setClient] = useState(createClient({ token: undefined, workspaceId: queryParams.workspaceId }));

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();

      if (token) {
        setClient(createClient({ token, workspaceId: queryParams.workspaceId }));
      }
    };

    fetchToken();
  }, [getToken, queryParams.workspaceId]);

  return <Provider value={client}>{children}</Provider>;
};
