import SchemaBuilder from '@pothos/core';
import DataloaderPlugin from '@pothos/plugin-dataloader';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
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
  Context: Context;
  DefaultInputFieldRequiredness: true;
}>({
  defaultInputFieldRequiredness: true,
  plugins: [SimpleObjectsPlugin, DataloaderPlugin],
});

builder.queryType({});

builder.mutationType({});
