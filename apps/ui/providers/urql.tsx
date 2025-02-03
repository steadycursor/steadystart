import { Client, cacheExchange, fetchExchange, Provider } from 'urql';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

const createClient = (args: { token: string | undefined }) =>
  new Client({
    url: 'http://localhost:4000',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: { headers: { Authorization: args.token ? `Bearer ${args.token}` : '' } },
  });

type UrqlProviderProps = {
  children: React.ReactNode;
};
export const UrqlProvider = ({ children }: UrqlProviderProps) => {
  const { getToken } = useAuth();

  const [client, setClient] = useState(createClient({ token: undefined }));

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();

      if (token) {
        setClient(createClient({ token }));
      }
    };

    fetchToken();
  }, [getToken]);

  return <Provider value={client}>{children}</Provider>;
};
