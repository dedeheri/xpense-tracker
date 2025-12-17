import { sessions } from "@/lib/session";
import summariesServices from "@/services/summaries-service";
import transactionService from "@/services/transaction-services";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";
import filterTransactionByDate from "@/utils/summaries-by-date";
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

    // get current  transaction by userid

    const transactions = await transactionService.findMany({
      where: { userId: userId! },
      include: {
        type: true,
        category: true,
      },
    });

    const groupedByMonth = transactions.reduce((acc, item) => {
      // Ambil tahun dan bulan (format: YYYY-MM)
      const date = new Date(item.createdAt);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      // Jika key belum ada di accumulator, buat array baru
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      // Masukkan item ke dalam grupnya
      acc[monthYear].push(item);

      return acc;
    }, {});

    console.log(groupedByMonth);

    const [income, expense, saving] = await Promise.all([
      summariesServices.findFirst({
        where: { ...commonWhereClause, type: "Income" },
      }),
      summariesServices.findFirst({
        where: { ...commonWhereClause, type: "Expense" },
      }),
      summariesServices.findFirst({
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
