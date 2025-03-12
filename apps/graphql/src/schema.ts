import { builder } from './builder';

import './schema/index';

import './resolvers/account/mutations/createAccount';
import './resolvers/account/queries/accounts';
import './resolvers/account/queries/account';

import './resolvers/post/mutations/createPost';
import './resolvers/post/queries/posts';
import './resolvers/post/queries/post';

import './resolvers/user/mutations/updateUser';
import './resolvers/user/queries/me';

export const schema = builder.toSchema();
