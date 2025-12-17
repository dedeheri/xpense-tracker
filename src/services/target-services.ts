import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const findMany = async (options?) => {
  // const results = await prisma.target.findMany({
  //   ...options,
  // });
  // return results;
};

const findFirst = async (options) => {
  // const results = await prisma.target.findFirst({
  //   ...options,
  // });
  // return results;
};

const createOne = async (options) => {
  // const results = await prisma.target.create({ ...options });
  // return results;
};

const targetService = { findMany, findFirst, createOne };
export default targetService;
