import { schema, createContext } from '@steadystart/graphql';
import { createYoga } from 'graphql-yoga';
import type { Request } from '@steadystart/graphql/dist/types/Request';
import type { NextApiRequest, NextApiResponse } from 'next';

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
      headers: req.headers as HeadersInit,
      method: req.method,
      body: req.method === 'GET' ? null : JSON.stringify(req.body),
    });

    const customRequest = request as unknown as Request;

    if (req.headers.authorization) {
      customRequest.headers.authorization = req.headers.authorization;
    }
    if (req.headers.account) {
      customRequest.headers.account = req.headers.account as string;
    }

    return createContext({ request: customRequest });
  },
});
