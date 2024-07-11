import type { User } from '@steadysass/prisma';
import { Language } from '@steadysass/prisma';
import { CustomError } from '../CustomError';

type UserNotFoundErrorOptions = Partial<Pick<User, 'id' | 'email'>>;

export class UserNotFoundError extends CustomError<UserNotFoundErrorOptions> {
  public name = 'UserNotFoundError';

  toString = () => {
    if (this.data.email) {
      return `User with email ${this.data.email} not found.`;
    }

    return 'User not found.';
  };

  translate = (args: { language: Language }) => {
    switch (args.language) {
      default:
        return this.toString();
    }
  };
}
