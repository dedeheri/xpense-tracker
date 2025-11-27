/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const createExpense = async (options: Prisma.ExpenseSummariesCreateArgs) => {
  const result = await prisma.expenseSummaries.create({
    ...options,
  });

  return result;
};

const findManyExpense = async (
  options?: Prisma.ExpenseSummariesFindManyArgs
) => {
  const result = await prisma.expenseSummaries.findMany({
    ...options,
  });

  return result;
};

const updateExpense = async (options: Prisma.ExpenseSummariesUpdateArgs) => {
  const result = await prisma.expenseSummaries.update({
    ...options,
  });

  return result;
};

const findFirst = async (options?: Prisma.ExpenseSummariesFindFirstArgs) => {
  const result = await prisma.expenseSummaries.findFirst(options);
  return result;
};

export default { createExpense, findManyExpense, updateExpense, findFirst };
