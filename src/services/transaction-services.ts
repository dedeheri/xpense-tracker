import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const create = async (options: Prisma.TransactionCreateArgs) => {
  const result = await prisma.transaction.create(options);
  return result;
};

const destroy = async (options: Prisma.TransactionDeleteArgs) => {
  const results = await prisma.transaction.delete(options);
  return results;
};

const findMany = async (options?: Prisma.TransactionFindManyArgs) => {
  const results = await prisma.transaction.findMany({ ...options });
  return results;
};

const transactionService = { create, findMany, destroy };
export default transactionService;
