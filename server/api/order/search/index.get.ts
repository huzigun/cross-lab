import { Prisma } from '@prisma/client';
import { type SearchOrderSchema, searchOrderSchema } from '~/schema/order';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const query = getQuery(event);
  if (typeof query.status === 'string') {
    query.status = query.status ? [query.status] : undefined;
  }

  const { success } = searchOrderSchema.safeParse(query ?? {}); // 검증
  if (!success) {
    throw createError({
      status: 400,
      message: 'Bad Request',
    });
  }

  const data = searchOrderSchema.parse(query ?? {}); // 파싱
  const where: Prisma.OrderWhereInput = {
    status: data.status
      ? {
          in: data.status,
        }
      : undefined,
  };
  if (data.keyword && data.keyword.length > 0) {
    where.OR = [
      {
        customer: {
          contains: data.keyword,
        },
      },
      {
        address: {
          contains: data.keyword,
        },
      },
      {
        contact: {
          contains: data.keyword,
        },
      },
      {
        memo: {
          contains: data.keyword,
        },
      },
    ];
  }
  await delay(1000);
  const totalCount = await countOrder({ where });
  const { skip, take } = generateSkip(data.page, data.limit);
  const orders = await findManyOrder({
    where: where,
    orderBy: { lastChangedDate: 'desc' },
    skip,
    take,
    include: {
      install: true,
    },
  });

  return {
    totalCount,
    items: orders,
  };
});
