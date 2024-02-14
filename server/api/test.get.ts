// import { generateId } from 'lucia';
import { type SearchOrderSchema, searchOrderSchema } from '~/schema/order';
import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  // throw createError({
  //   statusCode: 401,
  //   statusMessage: 'Unauthorized, hint: try `hunter2` as password',
  // });

  // const query = getQuery<SearchOrderSchema>(event);

  // const { success } = searchOrderSchema.safeParse(query); // 검증
  // const data = success ? searchOrderSchema.parse(query) : null; // 파싱

  // const test = await serverSupabaseUser(event);

  return {
    // query,
    // data,
    // success,
    test: event.context.user,
    message: 'Hello World',
  };
});
