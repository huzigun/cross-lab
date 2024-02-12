import { Argon2id } from 'oslo/password';
import { signInSchema, type signInSchemaType } from '~/schema/auth';

const authErrorResult = {
  status: 401,
  message: '아이디 혹은 비밀번호를 확인해주세요.',
};

export default eventHandler(async (event) => {
  const body = await readBody<signInSchemaType>(event);
  const { success } = signInSchema.safeParse(body); // Validate input

  if (!success) {
    throw createError(authErrorResult);
  }

  const { username, password } = body;

  await delay(1000); // Simulate network delay

  const existUser = await getUser({
    where: { username },
  });

  if (!existUser) {
    throw createError(authErrorResult);
  }

  const validPassword = await new Argon2id().verify(
    existUser.password,
    password,
  );

  if (!validPassword) {
    throw createError(authErrorResult);
  }

  const session = await lucia.createSession(existUser.id, {});
  appendHeader(
    event,
    'Set-Cookie',
    lucia.createSessionCookie(session.id).serialize(),
  );

  return {
    message: `${existUser.nickname}님 환영합니다!`,
  };
});
