import { z } from 'zod';

export const createEngineerSchema = z.object({
  name: z
    .string({
      required_error: '이름을 입력해주세요.',
    })
    .trim(),
  number: z
    .string({
      required_error: '전화번호를 입력해주세요.',
    })
    .trim(),
  zipCode: z
    .string({
      required_error: '우편번호를 입력해주세요.',
    })
    .trim(),
  address: z
    .string({
      required_error: '주소를 입력해주세요.',
    })
    .trim(),
  addressDetail: z.string().trim().optional(),
});

export type CreateEngineerSchema = z.output<typeof createEngineerSchema>;
