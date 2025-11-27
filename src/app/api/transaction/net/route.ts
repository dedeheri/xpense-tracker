import { sessions } from "@/lib/session";
import summariesService from "@/services/summaries-service";
import calculateTotalSummaries from "@/utils/calculate-total-summaries";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { userId } = await sessions();
  try {
    const commonWhereClause: {
      userId: string;
    } = {
      userId: userId!,
    };

    const [income, expense] = await Promise.all([
      summariesService.findMany({
        where: {
          ...commonWhereClause,
          type: "Income",
        },
      }),
      summariesService.findMany({
        where: {
          ...commonWhereClause,
          type: "Expense",
        },
      }),
    ]);

    const totalExpense = calculateTotalSummaries(expense);
    const totalIncome = calculateTotalSummaries(income);

    return NextResponse.json(
      {
        message: "Get Summaries Successfully.",
        data: {
          netIncome: totalIncome - totalExpense,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
};
