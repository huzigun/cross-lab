export default defineEventHandler(async (evnet) => {
  if (!evnet.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const engineers = await client.engineer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      number: true,
    },
  });

  return engineers.map((engineer) => ({
    id: engineer.id,
    name: `${engineer.name} (${engineer.number})`,
  }));
});
