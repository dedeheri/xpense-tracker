import { sessions } from "@/lib/session";
import summariesService from "@/services/summaries-service";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { userId } = await sessions();

  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    const commonWhereClause: {
      userId: string;
      createdAt: {
        gte: Date;
        lt: Date;
      };
    } = {
      userId: userId!,

      createdAt: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    };

    const [income, expense, saving] = await Promise.all([
      summariesService.findFirst({
        where: { ...commonWhereClause, type: "Income" },
      }),
      summariesService.findFirst({
        where: { ...commonWhereClause, type: "Expense" },
      }),
      summariesService.findFirst({
        where: { ...commonWhereClause, type: "Saving" },
      }),
    ]);

    return NextResponse.json(
      {
        message: "Get Summaries Successfully.",
        data: {
          income,
          expense,
          saving,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
};
