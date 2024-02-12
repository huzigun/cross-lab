import { type SearchOrderSchema, searchOrderSchema } from '~/schema/order';

/**
 * 주문 정보를 검색하는 API
 */
export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const body = await readBody<SearchOrderSchema>(event);
  const { success } = searchOrderSchema.safeParse(body ?? {}); // 검증

  if (!success) {
    throw createError({
      status: 400,
      message: 'Bad Request',
    });
  }

  const data = searchOrderSchema.parse(body ?? {}); // 파싱
  console.log(data);
  const where = {
    status: data.status
      ? {
          in: data.status,
        }
      : undefined,
  };
  const totalCount = await countOrder({ where });
  const { skip, take } = generateSkip(data.page, data.limit);
  const orders = await findManyOrder({
    where: where,
    orderBy: { lastChangedDate: 'desc' },
    skip,
    take,
  });

  return {
    totalCount,
    items: orders,
  };
});
