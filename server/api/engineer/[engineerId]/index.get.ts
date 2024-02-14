import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid/non-secure';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const engineerId = getRouterParam(event, 'engineerId');

  // engineerId가 없거나 `new`이거나 15자리가 아닌 경우 400 에러 반환
  if (!engineerId || engineerId === 'new' || engineerId.length !== 15) {
    throw createError({
      status: 400,
      message: 'Bad Request',
      statusMessage: 'Bad Request',
    });
  }

  try {
    const engineer = await client.engineer.findUnique({
      where: {
        id: engineerId,
        deletedAt: null, // 삭제되지 않은 엔지니어만 가져옴
      },
    });

    if (!engineer) {
      throw createError({
        status: 404,
        message: 'Not Found',
        statusMessage: 'Not Found',
      });
    }

    const products = await client.product.findMany({
      select: { id: true }, // 성능 최적화를 위해 id만 가져옴
      where: {
        stockItems: {
          none: { engineerId }, // engineerId가 없는 product만 가져옴
        },
        deletedAt: null, // 삭제되지 않은 product만 가져옴
      },
    });

    // engineerId가 없는 product에 대해 stockItem을 생성
    if (products.length > 0) {
      await client.stockItem.createMany({
        data: products.map(
          (product): Prisma.StockItemCreateManyInput => ({
            id: nanoid(),
            engineerId,
            productId: product.id,
            quantity: 0,
          }),
        ),
      });
    }

    const stockItems = await client.stockItem.findMany({
      where: { engineerId },
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            stock: true,
          },
        },
        inventoryMovements: {
          select: {
            id: true,
            stockItemId: true,
            type: true,
            quantity: true,
            date: true,
            description: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    return { engineer, stockItems };
  } catch (error) {
    /**
     * @todo: Sentry에 에러 로깅
     */
    throw createError({
      status: 500,
      message: 'Internal Server Error',
      statusMessage: 'Internal Server Error',
    });
  }
});
