import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const create = async (options: Prisma.CategoryCreateArgs) => {
  const results = await prisma.category.create({
    ...options,
  });
  return results;
};

const findMany = async (options: Prisma.CategoryFindManyArgs) => {
  const results = await prisma.category.findMany({
    ...options,
  });
  return results;
};

const findFirst = async (options: Prisma.CategoryFindFirstArgs) => {
  const results = await prisma.category.findFirst({
    ...options,
  });
  return results;
};

const destroy = async (options: Prisma.CategoryDeleteArgs) => {
  const results = await prisma.category.delete({
    ...options,
  });
  return results;
};

const update = async (options: Prisma.CategoryUpdateArgs) => {
  const results = await prisma.category.update({
    ...options,
  });
  return results;
};

export default { update, create, findMany, destroy, findFirst };
