import SchemaBuilder from '@pothos/core';
import DataloaderPlugin from '@pothos/plugin-dataloader';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ZodPlugin from '@pothos/plugin-zod';
import { accessPolicyAuthScope, AccessPolicyAuthScopeArgs } from './authScopes/accessPolicyAuthScope';
import { modelItemsBelongToAccountScope, ModelItemsBelongToAccountScopeArgs } from './authScopes/modelItemsBelongToAccount';
import { userHasAccessOnAccountScope, UserHasAccessOnAccountScopeArgs } from './authScopes/userHasAccessOnAccountScope';
import { Context } from './context';
import { Date } from './schema/Date';
import { DateTime } from './schema/DateTime';
import { ID } from './schema/ID';
import { Time } from './schema/Time';

export const builder = new SchemaBuilder<{
  Scalars: {
    ID: ID;
    Date: Date;
    Time: Time;
    DateTime: DateTime;
  };
  AuthScopes: {
    accessPolicy: AccessPolicyAuthScopeArgs;
    userHasAccessOnAccount: UserHasAccessOnAccountScopeArgs;
    modelItemsBelongToAccount: ModelItemsBelongToAccountScopeArgs;
  };
  Context: Context;
  DefaultFieldNullability: false;
  DefaultInputFieldRequiredness: true;
  DefaultAuthStrategy: 'all';
}>({
  defaultFieldNullability: false,
  defaultInputFieldRequiredness: true,
  plugins: [ZodPlugin, ScopeAuthPlugin, SimpleObjectsPlugin, DataloaderPlugin],
  scopeAuth: {
    defaultStrategy: 'all',
    treatErrorsAsUnauthorized: true,
    authScopes: async (ctx) => {
      return {
        accessPolicy: accessPolicyAuthScope(ctx),
        userHasAccessOnAccount: userHasAccessOnAccountScope(ctx),
        modelItemsBelongToAccount: modelItemsBelongToAccountScope(ctx),
      };
    },
  },
});

builder.queryType({});

builder.mutationType({});
