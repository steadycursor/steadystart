import { builder } from './builder';

import './schema/index';

import './resolvers/hello';
import './resolvers/createHello';

export const schema = builder.toSchema();
