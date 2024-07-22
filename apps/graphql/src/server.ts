import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { context } from './context';
import { schema } from './schema';

const server = express();

server.use(cors());

server.get('/', expressPlayground({ endpoint: '/' }));

server
  .post('/', [
    graphqlHTTP(async (req) => {
      return {
        schema,
        context: await context({ req }),
      };
    }),
  ])
  .listen(4005, () => console.log('Server is running on http://localhost:4005'));
