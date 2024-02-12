export default defineEventHandler(async (evnet) => {
  if (!evnet.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const engineers = await findManyEngineer({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
    },
  });

  return engineers;
});
