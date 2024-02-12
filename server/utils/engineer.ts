import { Prisma, Engineer } from '@prisma/client';
import { generateId } from 'lucia';

export const createEngineer = async (data: Prisma.EngineerCreateInput) => {
  const engineer = await client.engineer.create({
    data: {
      id: generateId(15),
      ...data,
    },
  });

  return engineer;
};

export const findManyEngineer = async <T extends Engineer>(
  args?: Prisma.EngineerFindManyArgs,
) => {
  const engineers = await client.engineer.findMany(args);
  return engineers as T[];
};
