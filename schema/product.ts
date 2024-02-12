import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  stock: z.number().min(0, 'Stock must be greater than 0'),
  description: z.string().optional(),
  smartstoreProductId: z.string().optional(),
  coopangProductId: z.string().optional(),
});

export type CreateProductSchema = z.output<typeof createProductSchema>;
