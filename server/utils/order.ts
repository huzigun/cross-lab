import type { Prisma, Order } from '@prisma/client';
import { nanoid } from 'nanoid/non-secure';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

export const getSmartStoreToken = async () => {
  const smartstore = await client.smartStore.findUnique({
    where: {
      id: 'crosslab',
    },
  });

  if (!smartstore) {
    return null;
  }

  if (
    !!smartstore.token &&
    dayjs(smartstore.expiresAt).add(-10, 'minute').isAfter(dayjs(new Date())) // 만료 10분 전
  ) {
    return smartstore.token;
  }

  const timestamp = new Date().getTime();

  // 밑줄로 연결하여 password 생성
  const password = `${smartstore.clientId}_${timestamp}`;
  // bcrypt 해싱
  const hashed = bcrypt.hashSync(password, smartstore.clientSecret);
  const encoded = Buffer.from(hashed, 'utf-8').toString('base64');

  const data = await $fetch<{
    access_token: string;
    expires_in: number;
    token_type: string;
  }>(`https://api.commerce.naver.com/external/v1/oauth2/token`, {
    method: 'POST',
    params: {
      client_id: smartstore.clientId,
      client_secret_sign: encoded,
      grant_type: 'client_credentials',
      type: 'SELF',
      timestamp,
    },
  });

  console.log(data);

  if (data.access_token) {
    await client.smartStore.update({
      where: {
        id: smartstore.id,
      },
      data: {
        token: data.access_token,
        expiresAt: dayjs().add(data.expires_in, 'second').toDate(),
      },
    });
    return data.access_token;
  } else {
    return null;
  }
};

export const upsertOrder = async (
  data: Prisma.OrderCreateInput,
  productId?: string,
) => {
  const order = await client.order.findFirst({
    where: {
      productOrderId: data.productOrderId,
    },
  });

  if (order) {
    return await client.order.update({
      where: {
        id: order.id,
      },
      data,
    });
  } else {
    return await client.order.create({
      data: {
        ...data,
        id: nanoid(),
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }
};

export async function findManyOrder<T extends Order>(
  data: Prisma.OrderFindManyArgs,
) {
  return (await client.order.findMany(data)) as T[];
}

export async function countOrder(args: Prisma.OrderCountArgs) {
  return await client.order.count(args);
}
