import { builder } from './builder';

import './schema/index';

import './resolvers/workspace/mutations/createWorkspace';
import './resolvers/workspace/queries/workspace';
import './resolvers/workspace/queries/workspaces';

import './resolvers/post/mutations/createPost';
import './resolvers/post/queries/posts';
import './resolvers/post/queries/post';

import './resolvers/user/mutations/updateUser';
import './resolvers/user/queries/me';

export const schema = builder.toSchema();
