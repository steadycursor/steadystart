import type { User } from '@steadysass/prisma';

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
}
