import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(4, 'Must be at least 4 characters'),
  password: z.string().min(4, 'Must be at least 4 characters'),
});
export type signInSchemaType = z.output<typeof signInSchema>;
