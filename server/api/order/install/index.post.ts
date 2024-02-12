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
  await delay(1000);
  await installOrder(
    {
      type: data.installType,
      useStock: data.useStock,
      engineer: {
        connect: { id: data.engineerId },
      },
      order: {
        connect: { id: data.orderId },
      },
    },
    {
      productId: data.productId,
      engineerId: data.engineerId,
      orderId: data.orderId,
    },
  );

  return {
    message: 'Hello, world!',
  };
});
