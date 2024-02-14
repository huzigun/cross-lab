export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const users = await getUsers({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      username: true,
      nickname: true,
      createdAt: true,
      role: true,
    },
  });
  return users;
});
