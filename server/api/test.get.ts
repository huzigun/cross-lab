export default defineEventHandler(async (event) => {
  // throw createError({
  //   statusCode: 401,
  //   statusMessage: 'Unauthorized, hint: try `hunter2` as password',
  // });

  await delay(1000);

  return {
    message: 'Hello World',
  };
});
