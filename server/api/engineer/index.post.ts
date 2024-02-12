import {
  createEngineerSchema,
  type CreateEngineerSchema,
} from '~/schema/engineer';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      statusMessage: 'Unauthorized',
    });
  }

  const body = await readBody<CreateEngineerSchema>(event);

  const { success } = createEngineerSchema.safeParse(body);

  if (!success) {
    throw createError({
      status: 400,
      message: 'Bad Request',
      statusMessage: 'Bad Request',
    });
  }

  await delay(1000);

  const engineer = await createEngineer(body);

  return {
    message: `${engineer.name} 기사가 등록되었습니다.`,
  };
});
