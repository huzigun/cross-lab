export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  await delay(1000);
  const orders = await findManyOrder({
    orderBy: {
      lastChangedDate: 'desc',
    },
  });

  return orders;
});
