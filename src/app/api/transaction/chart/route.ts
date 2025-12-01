"use server";

import { NextResponse, NextRequest } from "next/server";
import { sessions } from "@/lib/session";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";
import { aggregateTransactionsByDay } from "@/utils/chart-data";
import transactionService from "@/services/transaction-services";

export const GET = async (request: NextRequest) => {
  const { userId } = await sessions();

  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryParams = searchParams.get("category");

    const whereClause: {
      userId: string;
      category?: { title?: string };
    } = {
      userId: userId!,
    };

    if (categoryParams) {
      whereClause.category = { title: categoryParams };
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const transactions = (await transactionService.findMany({
      where: whereClause,
      include: {
        category: true,
        type: true,
      },
      orderBy: { createdAt: "desc" },
    })) as any[];

    const results = aggregateTransactionsByDay(transactions);

    if (results.length === 0) {
      return NextResponse.json(
        {
          error: "Chart is empty",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Transaction and Daily Summary created successfully.",
        data: results,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
};
