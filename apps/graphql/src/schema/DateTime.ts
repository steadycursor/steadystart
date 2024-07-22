import { DateTimeResolver } from 'graphql-scalars';
import { builder } from '../builder';

export type DateTime = {
  Input: Date;
  Output: Date;
};

export const DateTime = builder.addScalarType('DateTime', DateTimeResolver);
