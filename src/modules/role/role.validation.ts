import { z } from 'zod';

export const createRoleSchema = z.object({
  role_name: z.string().min(2),
  description: z.string().optional(),
});
