import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const findUniqueType = async (options: Prisma.TypeFindUniqueArgs) => {
  const reults = await prisma.type.findUnique({ ...options });
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

const typeServices = { findUniqueType, findFirst, findMany, create };
export default typeServices;
