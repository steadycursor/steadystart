import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(2),
});
