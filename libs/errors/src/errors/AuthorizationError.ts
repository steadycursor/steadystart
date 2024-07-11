import { CustomError } from '../CustomError';

type AuthorizationErrorOptions = {};

export class AuthorizationError extends CustomError<AuthorizationErrorOptions> {
  public name = 'AuthorizationError';

  constructor() {
    super({});
  }

  toString = () => 'Autherization with provided credentials is invalid.';
}
