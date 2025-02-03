import SchemaBuilder from '@pothos/core';
import DataloaderPlugin from '@pothos/plugin-dataloader';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import { accessPolicyAuthScope, AccessPolicyAuthScopeArgs } from './authScopes/accessPolicyAuthScope';
import { Context } from './context';
import { Date } from './schema/Date';
import { DateTime } from './schema/DateTime';
import { ID } from './schema/ID';
import { Time } from './schema/Time';
import ZodPlugin from '@pothos/plugin-zod';

export const builder = new SchemaBuilder<{
  Scalars: {
    ID: ID;
    Date: Date;
    Time: Time;
    DateTime: DateTime;
  };
  AuthScopes: {
    accessPolicy: AccessPolicyAuthScopeArgs;
  };
  Context: Context;
  DefaultInputFieldRequiredness: true;
  DefaultAuthStrategy: 'all';
}>({
  defaultInputFieldRequiredness: true,
  plugins: [ZodPlugin, ScopeAuthPlugin, SimpleObjectsPlugin, DataloaderPlugin],
  scopeAuth: {
    defaultStrategy: 'all',
    treatErrorsAsUnauthorized: true,
    authScopes: async (ctx) => {
      return {
        accessPolicy: (accessPolicy) => accessPolicyAuthScope(ctx)(accessPolicy),
      };
    },
  },
});

builder.queryType({});

builder.mutationType({});
