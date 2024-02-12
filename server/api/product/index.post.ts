import {
  createProductSchema,
  type CreateProductSchema,
} from '~/schema/product';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const body = await readBody<CreateProductSchema>(event);

  const { success } = createProductSchema.safeParse(body);

  if (!success) {
    throw createError({
      status: 400,
      message: 'Invalid request body',
      statusMessage: 'Bad Request',
    });
  }

  await delay(1000);

  const newProduct = await createProduct(body);

  return {
    message: `${newProduct.name} 상품이 등록되었습니다.`,
  };
});
