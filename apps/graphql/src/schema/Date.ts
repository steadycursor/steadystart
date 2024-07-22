import { DateResolver } from 'graphql-scalars';
import { builder } from '../builder';

export type Date = {
  Input: Date;
  Output: Date;
};

export const Date = builder.addScalarType('Date', DateResolver);
