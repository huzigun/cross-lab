import { nanoid } from 'nanoid';
import { installOrderSchema, type InstallOrderSchema } from '~/schema/order';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const body = await readBody<InstallOrderSchema>(event);

  const { success } = installOrderSchema.safeParse(body);

  if (!success) {
    throw createError({
      status: 400,
      message: 'Bad Request',
      statusMessage: 'Bad Request',
    });
  }
  const data = installOrderSchema.parse(body);

  await client.$transaction(async (prismaInstance) => {
    const installId = nanoid();
    // 설치 주문 생성
    await prismaInstance.install.create({
      data: {
        id: installId,
        type: data.installType,
        useStock: data.useStock,
        engineer: { connect: { id: data.engineerId } },
        order: { connect: { id: data.orderId } },
      },
    });

    // 본사 재고 사용 시
    if (!!data.useStock) {
      // 본사 재고 감소
      await prismaInstance.product.update({
        where: { id: data.productId },
        data: {
          stock: { decrement: 1 },
          inventoryMovements: {
            create: {
              id: nanoid(),
              type: 'OUTBOUND',
              quantity: 1,
              description: `(${installId}) 설치 출고`,
            },
          },
        },
      });

      // 엔지니어 재고 증가
      await prismaInstance.stockItem.upsert({
        where: {
          productId_engineerId: {
            productId: data.productId,
            engineerId: data.engineerId,
          },
        },
        create: {
          id: nanoid(),
          quantity: 1,
          product: { connect: { id: data.productId } },
          engineer: { connect: { id: data.engineerId } },
          inventoryMovements: {
            create: {
              type: 'INBOUND',
              quantity: 1,
              description: `(${installId}) 설치 입고`,
            },
          },
        },
        update: {
          quantity: { increment: 1 },
          inventoryMovements: {
            create: {
              type: 'INBOUND',
              quantity: 1,
              description: `(${installId}) 설치 입고`,
            },
          },
        },
      });
    }
  });

  return {
    message: 'Hello, world!',
  };
});
