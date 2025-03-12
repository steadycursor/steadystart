import { builder } from '../builder';
import * as Prisma from '@steadystart/prisma';

export const Locale = builder.enumType('Locale', {
  values: Object.fromEntries(Object.entries(Prisma.Locale).map(([name, value]) => [name, { value }])),
});
