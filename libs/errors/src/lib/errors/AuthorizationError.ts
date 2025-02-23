import { Language } from '@steadysass/prisma';
import { CustomError } from '../CustomError';

type AuthorizationErrorOptions = {};

export class AuthorizationError extends CustomError<AuthorizationErrorOptions> {
  public name = 'AuthorizationError';

  constructor() {
    super({});
  }

  toString = () => 'Authorization with provided credentials is invalid.';

  translate = (args: { language: Language }) => {
    switch (args.language) {
      default:
        return this.toString();
    }
  };
}
