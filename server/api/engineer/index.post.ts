import { Prisma } from '@prisma/client';
import {
  createEngineerSchema,
  type CreateEngineerSchema,
} from '~/schema/engineer';
import { nanoid } from 'nanoid/non-secure';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const body = await readBody<CreateEngineerSchema>(event);

  const { success } = createEngineerSchema.safeParse(body);

  if (!success) {
    throw createError({
      status: 400,
      message: 'Bad Request',
      statusMessage: 'Bad Request',
    });
  }

  const newEngineerId = nanoid();

  const engineer = await client.engineer.create({
    data: {
      id: newEngineerId,
      ...body,
    },
  });

  // engineerId가 없는 product에 대해 stockItem을 생성 - 에러가 발생해도 기사 등록은 성공
  try {
    const products = await client.product.findMany({
      select: { id: true }, // 성능 최적화를 위해 id만 가져옴
      where: {
        stockItems: {
          none: { engineerId: newEngineerId }, // engineerId가 없는 product만 가져옴
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
            engineerId: newEngineerId,
            productId: product.id,
            quantity: 0,
          }),
        ),
      });
    }
  } catch (error) {
    /**
     * @todo: 에러 처리
     */
  }

  return {
    message: `${engineer.name} 기사가 등록되었습니다.`,
  };
});
