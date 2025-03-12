import { z } from 'zod';
import { Locale } from '@steadystart/enums';

export const updateUserSchema = z.object({
  locale: z.enum(Object.values(Locale) as [Locale]),
});
