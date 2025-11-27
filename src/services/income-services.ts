/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const createIncome = async (options: Prisma.IncomeSummariesCreateArgs) => {
  const results = await prisma.incomeSummaries.create({
    ...options,
  });

  return results;
};

const updateIncome = async (options: Prisma.IncomeSummariesUpdateArgs) => {
  const results = await prisma.incomeSummaries.update({ ...options });
  return results;
};

const findManyIncome = async (options?: Prisma.IncomeSummariesFindManyArgs) => {
  const results = await prisma.incomeSummaries.findMany({
    ...options,
  });
  return results;
};

const findFirst = async (options?: Prisma.IncomeSummariesFindFirstArgs) => {
  const result = await prisma.incomeSummaries.findFirst(options);
  return result;
};

export default { createIncome, findManyIncome, updateIncome, findFirst };
