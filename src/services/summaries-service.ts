/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const createOne = async (options: Prisma.SummariesCreateArgs) => {
  const results = await prisma.summaries.create({ ...options });
  return results;
};
const findMany = async (options?: Prisma.SummariesFindManyArgs) => {
  const results = await prisma.summaries.findMany({
    ...options,
  });
  return results;
};

const findFirst = async (options?: Prisma.SummariesFindFirstArgs) => {
  const results = await prisma.summaries.findFirst({
    ...options,
  });
  return results;
};

const updateOne = async (options: Prisma.SummariesUpdateArgs) => {
  const results = await prisma.summaries.update({
    ...options,
  });

  return results;
};

const summariesServices = { createOne, findMany, findFirst, updateOne };
export default summariesServices;
