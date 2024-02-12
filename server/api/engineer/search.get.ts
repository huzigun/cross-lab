export default defineEventHandler(async (evnet) => {
  if (!evnet.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  await delay(1000);

  const engineers = await findManyEngineer({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return engineers;
});
