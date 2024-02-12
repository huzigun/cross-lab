import { type SearchOrderSchema, searchOrderSchema } from '~/schema/order';

export default defineEventHandler(async (event) => {
  // throw createError({
  //   statusCode: 401,
  //   statusMessage: 'Unauthorized, hint: try `hunter2` as password',
  // });

  const query = getQuery<SearchOrderSchema>(event);

  const { success } = searchOrderSchema.safeParse(query); // 검증
  const data = success ? searchOrderSchema.parse(query) : null; // 파싱

  return {
    query,
    data,
    success,
    message: 'Hello World',
  };
});
