import { z } from 'zod';
export const OrderStatusArray = [
  'PAYMENT_WAITING',
  'PAYED',
  'DELIVERING',
  'DELIVERED',
  'PURCHASE_DECIDED',
  'EXCHANGED',
  'CANCELED',
  'RETURNED',
  'CANCELED_BY_NOPAYMENT',
];
export const searchOrderSchema = z.object({
  page: z.preprocess(Number, z.number()).optional().default(1),
  limit: z.preprocess(Number, z.number()).optional().default(10),
  status: z
    .enum([
      'PAYMENT_WAITING',
      'PAYED',
      'DELIVERING',
      'DELIVERED',
      'PURCHASE_DECIDED',
      'EXCHANGED',
      'CANCELED',
      'RETURNED',
      'CANCELED_BY_NOPAYMENT',
    ])
    .array()
    .optional(),
  keyword: z.string().optional(),
});
export type SearchOrderSchema = z.output<typeof searchOrderSchema>;

export const installOrderSchema = z.object({
  orderId: z.string(),
  productId: z.string(),
  engineerId: z.string(),
  installType: z.enum(['INSTALL', 'REPAIR', 'MAINTENANCE']).optional(),
  useStock: z.boolean().optional(),
});
export type InstallOrderSchema = z.output<typeof installOrderSchema>;
