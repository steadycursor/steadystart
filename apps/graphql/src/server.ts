import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { context } from './context';
import { schema } from './schema';

const yoga = createYoga({
  schema,
  context,
  graphiql: true,
  graphqlEndpoint: '/',
  maskedErrors: false,
  cors: true,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000');
});
