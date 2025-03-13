import { ErrorMessage } from '@steadystart/errors';
// eslint-disable-next-line no-restricted-syntax
import { GraphQLError as OriginalGraphQLError } from 'graphql';

export class GraphQLError extends OriginalGraphQLError {
  constructor(message: ErrorMessage) {
    super(message);
  }
}
