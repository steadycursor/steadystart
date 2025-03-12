import type { NextApiRequest, NextApiResponse } from 'next';
import { createYoga } from 'graphql-yoga';
import { schema, createContext } from '@steadystart/graphql';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: '/api/graphql',
  schema,
  context: async ({ req }) => {
    const url = `http://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      headers: req.headers as any,
      method: req.method,
      body: req.method === 'GET' ? null : JSON.stringify(req.body),
    });

    return createContext({ request: request as any });
  },
});
