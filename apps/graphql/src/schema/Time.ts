import { TimeResolver } from 'graphql-scalars';
import { builder } from '../builder';

export type Time = {
  Input: Date;
  Output: Date;
};

export const Time = builder.addScalarType('Time', TimeResolver);
