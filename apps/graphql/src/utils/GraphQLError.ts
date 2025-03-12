import * as graphql from 'graphql';
import { ErrorMessage } from '@steadystart/errors';

export class GraphQLError extends graphql.GraphQLError {
  constructor(message: ErrorMessage) {
    super(message);
  }
}
