import { Locale } from '@steadystart/enums';
import { z } from 'zod';

export const updateUserSchema = z.object({
  locale: z.enum(Object.values(Locale) as [Locale]),
});
