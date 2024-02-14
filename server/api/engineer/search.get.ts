export default defineEventHandler(async (evnet) => {
  // if (!evnet.context.user) {
  //   throw createError({
  //     status: 401,
  //     message: 'Unauthorized',
  //     statusMessage: 'Unauthorized',
  //   });
  // }

  const engineers = await client.engineer.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      number: true,
      zipCode: true,
      address: true,
      addressDetail: true,
      createdAt: true,
      stockItems: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              stock: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return engineers.map((engineer) => ({
    ...engineer,
    ...engineer.stockItems.reduce((acc, stockItem) => {
      acc[stockItem.product.id] = stockItem.quantity;
      return acc;
    }, {} as Record<string, number>),
  }));
});
