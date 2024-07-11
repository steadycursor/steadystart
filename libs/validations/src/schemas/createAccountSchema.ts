import { z } from 'zod';

export const createAccountSchema = z.object({
  name: z.string().min(2),
});
