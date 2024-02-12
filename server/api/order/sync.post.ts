import dayjs from 'dayjs';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const accessToken = await getSmartStoreToken();

  if (!accessToken) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  let orders: any[] = [];

  const now = dayjs();
  let to = now.subtract(5, 'second'); // 5초 전
  let from = now.subtract(5, 'second').subtract(1, 'day'); // 1일 전

  for (let i = 0; i < 31; i++) {
    const result = await $fetch<any>(
      `https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/last-changed-statuses`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          lastChangedFrom: from.toISOString(),
          lastChangedTo: to.toISOString(),
        },
      },
    );
    if (result.data && result.data.count > 0) {
      orders = orders.concat(result.data.lastChangeStatuses);
    }
    to = to.subtract(1, 'day').add(1, 'second');
    from = from.subtract(1, 'day').add(1, 'second');
    await delay(1000);
  }

  const productOrders: any[] = [];

  if (orders.length > 0) {
    const productOrderIds = orders.map((item: any) => {
      return item.productOrderId;
    });

    const orderDetails = await $fetch<any>(
      `https://api.commerce.naver.com/external/v1/pay-order/seller/product-orders/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          productOrderIds,
        },
      },
    );

    if (orderDetails.data && orderDetails.data.length > 0) {
      for (let i = 0; i < orderDetails.data.length; i++) {
        productOrders.push(orderDetails.data[i]);
        const { productOrder, order } = orderDetails.data[i];
        const product = await findOneProduct({
          where: {
            smartstoreProductId: productOrder.productId,
          },
          select: {
            id: true,
          },
        });
        const lastChangeDate = orders.find((item) => {
          return item.productOrderId === productOrder.productOrderId;
        })?.lastChangedDate;
        await upsertOrder(
          {
            buyShop: 'SMARTSTORE',
            productOrderId: productOrder.productOrderId,
            productName: productOrder.productName,
            productOption: productOrder.productOption,
            quantity: productOrder.quantity,
            status: productOrder.productOrderStatus,
            orderId: order.orderId,
            ordererId: order.ordererId,
            ordererName: order.ordererName,
            customer: productOrder.shippingAddress.name,
            address:
              productOrder.shippingAddress.zipCode +
              ' ' +
              productOrder.shippingAddress.baseAddress +
              ' ' +
              productOrder.shippingAddress.detailedAddress,
            contact: productOrder.shippingAddress.tel1,
            lastChangedDate: lastChangeDate,
          },
          String(product?.id ?? ''),
        );
      }
    }
  }
});
