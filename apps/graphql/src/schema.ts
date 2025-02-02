import { builder } from './builder';

import './schema/index';

import './resolvers/account/queries/accounts';
import './resolvers/account/mutations/createAccount';

export const schema = builder.toSchema();
