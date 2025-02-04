import { z } from 'zod';

export const createPostSchema = z.object({
  name: z.string().min(2),
});
