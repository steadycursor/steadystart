import { builder } from './builder';

import './schema/index';

import './resolvers/account/mutations/createAccount';
import './resolvers/account/queries/accounts';
import './resolvers/account/queries/account';

export const schema = builder.toSchema();
