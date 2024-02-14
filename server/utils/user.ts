import { Prisma, User } from '@prisma/client';
// import { generateId } from 'lucia';
// import { Argon2id } from 'oslo/password';

/**
 * 사용자 조회
 *
 * @param args - Prisma.UserFindFirstArgs
 * @param withDelete - boolean 삭제된 데이터 포함 여부
 * @returns - User
 */
export async function getUser<T extends User>(
  args?: Prisma.UserFindFirstArgs,
  withDelete = false,
) {
  const where: Prisma.UserWhereInput = args?.where ?? {};
  if (withDelete) {
    delete where.deletedAt;
  } else {
    where.deletedAt = null;
  }

  const user = await client.user.findFirst({
    ...(args ?? {}),
    where,
  });
  return user as T;
}

/**
 * 사용자 목록 조회
 *
 * @param args - Prisma.UserFindManyArgs
 * @param withDelete - boolean 삭제된 데이터 포함 여부
 * @returns - User[]
 */
export async function getUsers<T extends User>(
  args?: Prisma.UserFindManyArgs,
  withDelete = false,
) {
  const where: Prisma.UserWhereInput = args?.where ?? {};
  if (withDelete) {
    delete where.deletedAt;
  } else {
    where.deletedAt = null;
  }

  const users = await client.user.findMany({
    ...(args ?? {}),
    where,
  });
  return users as T[];
}
export type GetUsersType = typeof getUsers;

// /**
//  * 사용자 생성
//  *
//  * @param data - Prisma.UserCreateInput
//  * @returns - { success: boolean, user?: User, message: string }
//  */
// export async function createUser(data: Prisma.UserCreateInput) {
//   const exist = await getUser({
//     where: {
//       username: data.username,
//     },
//     select: { id: true },
//   });

//   if (!!exist) {
//     return {
//       success: false,
//       message: '이미 존재하는 아이디입니다.',
//     };
//   }

//   try {
//     await delay(1000); // 1초 딜레이
//     // 비밀번호 해싱
//     const hashedPassword = await new Argon2id().hash(data.password);
//     const user = await client.user.create({
//       data: {
//         ...data,
//         id: generateId(15), // 15자리 아이디 생성
//         password: hashedPassword,
//       },
//     });
//     return {
//       success: true,
//       user: user,
//       message: '사용자가 생성되었습니다.',
//     };
//   } catch (error: any) {
//     console.error(error.message);
//     return {
//       success: false,
//       message: '사용자 생성에 실패했습니다.',
//     };
//   }
// }
// export type CreateUserType = typeof createUser;

// /**
//  * 사용자 수정
//  *
//  * @param data - Pick<Prisma.UserUpdateInput, 'username' | 'nickname'>
//  * @param userId - 사용자 아이디
//  * @returns - { success: boolean, user?: User, message: string }
//  */
// export async function updateUser(data: Prisma.UserUpdateInput, userId: string) {
//   try {
//     await delay(1000); // 1초 딜레이
//     delete data.password; // 비밀번호는 제외
//     const user = await client.user.update({
//       data,
//       where: { id: userId },
//     });
//     return {
//       success: true,
//       user: user,
//       message: '사용자가 수정되었습니다.',
//     };
//   } catch (error: any) {
//     console.error(error.message);
//     return {
//       success: false,
//       message: '사용자 수정에 실패했습니다.',
//     };
//   }
// }
