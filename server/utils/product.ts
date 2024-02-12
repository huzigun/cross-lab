import { Prisma, MovementType } from '@prisma/client';
import { generateId } from 'lucia';

/**
 * 상품 생성
 *
 * @param data - CreateProductSchema
 * @returns - Prisma.Product
 */
export const createProduct = async (data: Prisma.ProductCreateInput) => {
  // data.stock가 0보다 크면 재고 이동 생성
  const stockMovement =
    data.stock && data.stock > 0
      ? {
          create: {
            id: generateId(20),
            type: MovementType.INBOUND,
            quantity: data.stock ?? 0,
          },
        }
      : undefined;

  return await client.product.create({
    data: {
      ...data,
      id: generateId(15),
      inventoryMovements: stockMovement,
    },
  });
};

export const findManyProduct = async (data: Prisma.ProductFindManyArgs) => {
  return await client.product.findMany(data);
};

export const findOneProduct = async (data: Prisma.ProductFindFirstArgs) => {
  return await client.product.findFirst(data);
};
