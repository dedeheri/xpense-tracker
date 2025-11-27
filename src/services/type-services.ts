/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type FindUniqueTypeArgs = Prisma.TypeFindUniqueArgs;

const findUniqueType = async (
  id: string,
  options?: Omit<FindUniqueTypeArgs, "where">
) => {
  const reults = await prisma.type.findUniqueOrThrow({
    where: { id: id },
    ...options,
  });

  return reults;
};

const findFirst = async (options?: Prisma.TypeFindFirstArgs) => {
  const result = await prisma.type.findFirst(options);

  return result;
};

const findMany = async (options?: Prisma.TypeFindManyArgs) => {
  const result = await prisma.type.findMany(options);
  return result;
};

const create = async (options: Prisma.TypeCreateArgs) => {
  const result = await prisma.type.create({ ...options });
  return result;
};

export default { findUniqueType, findFirst, findMany, create };
