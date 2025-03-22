import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  title: z.string().min(2),
});
