import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { createContext } from './context';
import { schema } from './schema';

const yoga = createYoga({
  schema,
  context: createContext,
  graphiql: true,
  graphqlEndpoint: '/',
  maskedErrors: false,
  cors: true,
});

createServer(yoga).listen(4000, () => {
  console.info('Server is running on http://localhost:4000');
});
