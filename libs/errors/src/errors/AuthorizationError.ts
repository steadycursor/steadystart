import { CustomError } from '../CustomError';
import { Language } from '@steadysass/prisma';

type AuthorizationErrorOptions = {};

export class AuthorizationError extends CustomError<AuthorizationErrorOptions> {
  public name = 'AuthorizationError';

  constructor() {
    super({});
  }

  toString = () => 'Autherization with provided credentials is invalid.';

  translate = (args: { language: Language }) => {
    switch (args.language) {
      default:
        return this.toString();
    }
  };
}
