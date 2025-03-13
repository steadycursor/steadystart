import * as Prisma from '@steadystart/prisma';
import { builder } from '../builder';

export const Locale = builder.enumType('Locale', {
  values: Object.fromEntries(Object.entries(Prisma.Locale).map(([name, value]) => [name, { value }])),
});
