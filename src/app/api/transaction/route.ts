"use server";

import { NextResponse, NextRequest } from "next/server";

import { sessions } from "@/lib/session";
import { handleErrorPrisma } from "@/utils/prisma-error-handler";
import categoryServices from "@/services/category-services";
import transactionServices from "@/services/transaction-services";
import typeServices from "@/services/type-services";
import summariesService from "@/services/summaries-service";
import filterTransactionByDate from "@/utils/summaries-by-date";
import percentSummaries from "@/utils/percent-summaries";
import calculateIncreaseStatus from "@/utils/calculate-increase";
import { groupTransactionsByMonth } from "@/utils/group-transactions-Month";
import findSummaryByType from "@/utils/find-summries-by-type";
import getCurrentMonthSummaries from "@/utils/current-month-summaries";
import { updateAllSummaries } from "@/utils/summary-update";

export const POST = async (request: NextRequest) => {
  try {
    const { userId } = await sessions();
    const { typeId, categoryId, amount, note } = await request.json();
    const parsedAmount = parseInt(amount);

    if (!typeId || !categoryId || !amount || !note) {
      return NextResponse.json(
        {
          error: true,
          message:
            "Missing required fields: type, category, amount, and note are necessary.",
        },
        { status: 409 }
      );
    }

    // create transaction
    await Promise.all([
      await transactionServices.create({
        data: {
          userId: userId!,
          amount: parsedAmount,
          categoryId: categoryId,
          typeId: typeId,
          note: note,
        },
      }),
      await categoryServices.update({
        where: {
          id: categoryId,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      }),
    ]);

    //  summaries
    const type = await typeServices.findUniqueType({
      where: { id: typeId },
      select: { title: true },
    });

    const [allSummaries, savingSummaries] = await Promise.all([
      await summariesService.findMany({
        where: {
          userId: userId!,
          type: type?.title,
        },
        orderBy: { createdAt: "desc" },
        take: 2,
      }),

      await summariesService.findMany({
        where: {
          userId: userId!,
          type: "Saving",
        },
        orderBy: { createdAt: "desc" },
        take: 2,
      }),
    ]);

    const currentTypeFilter = filterTransactionByDate(allSummaries);
    const currentTypeAmount = currentTypeFilter?.currentMonth?.amount ?? 0;
    const lastTypeAmount = currentTypeFilter?.lastMonth?.amount ?? 0;

    const newTotalAmount = currentTypeAmount + parsedAmount;

    const newPercent = percentSummaries(
      lastTypeAmount,
      currentTypeAmount,
      parsedAmount
    );

    const increaseStatus = calculateIncreaseStatus(
      currentTypeAmount,
      newPercent
    );

    const incomeExpenseData = {
      userId: userId!,
      type: type?.title || "",
      amount: newTotalAmount,
      increase: increaseStatus,
      percent: newPercent,
    };

    if (currentTypeFilter?.currentMonth) {
      await summariesService.updateOne({
        where: { id: currentTypeFilter.currentMonth.id },
        data: incomeExpenseData,
      });
    } else {
      await summariesService.createOne({
        data: incomeExpenseData,
      });
    }

    const savingFilter = filterTransactionByDate(savingSummaries);

    const savingPercent = percentSummaries(
      savingFilter?.lastMonth?.amount,
      savingFilter?.currentMonth?.amount
    );

    const currentTypeAmountSaving = savingFilter?.currentMonth?.amount ?? 0;
    const lastTypeAmountSaving = savingFilter?.lastMonth?.amount ?? 0;

    let latestIncome = 0;
    let latestExpense = 0;

    if (type?.title === "Income") {
      latestIncome = currentTypeAmountSaving + parsedAmount;
    } else if (type?.title === "Expense") {
      latestExpense = currentTypeAmountSaving - parsedAmount;
    }

    const newPercentSaving = percentSummaries(
      lastTypeAmountSaving,
      currentTypeAmount,
      parsedAmount
    );

    const increaseStatusSaving = calculateIncreaseStatus(
      currentTypeAmountSaving,
      newPercentSaving
    );

    const savingUpdateData = {
      amount: type?.title === "Income" ? latestIncome : latestExpense,
      increase: increaseStatusSaving,
      percent: savingPercent,
    };

    if (savingFilter?.currentMonth) {
      await summariesService.updateOne({
        where: { id: savingFilter.currentMonth.id },
        data: savingUpdateData,
      });
    } else {
      await summariesService.createOne({
        data: {
          userId: userId!,
          type: "Saving",
          ...savingUpdateData,
        },
      });
    }

    // await updateAllSummaries({
    //   userId: userId!,
    //   typeTitle: type?.title || "",
    //   parsedAmount,
    // });

    return NextResponse.json(
      {
        message: "Transaction and Daily Summary created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const { userId } = await sessions();
    const searchParams = request.nextUrl.searchParams;

    const categoryParams = searchParams.get("category");
    const typeParams = searchParams.get("type");
    const pageParams = parseInt(searchParams.get("page") as string) || 1;
    const pageSize = pageParams + 1;

    if (pageParams < 1) {
      return NextResponse.json(
        {
          message: "Page number must be greater than 0.",
        },
        { status: 409 }
      );
    }

    const whereClause: {
      userId: string;
      category?: { title: string };
      type?: { title: string };
    } = {
      userId: userId!,
    };

    if (categoryParams) {
      whereClause.category = { title: categoryParams };
    }

    if (typeParams) {
      whereClause.type = { title: typeParams };
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const transactions = (await transactionServices.findMany({
      where: whereClause,
      include: {
        category: true,
        type: true,
      },
      orderBy: { createdAt: "desc" },
    })) as any[];

    const groupedTransactions = groupTransactionsByMonth(transactions);
    const totalTransaction = groupedTransactions.length;
    const totalPages = Math.ceil(totalTransaction / pageSize);
    const pagination = groupTransactionsByMonth(transactions).slice(
      pageParams - 1,
      pageSize - 1
    );

    if (pagination.length === 0) {
      return NextResponse.json(
        {
          error: "Transaction is empty",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Transaction and Daily Summary created successfully.",
        data: pagination,
        currentPage: pageParams,
        totalPages: totalPages,
        totalItems: totalTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { userId } = await sessions();
    const body = await request.json();
    const { transactionId, typeTitle, categoryId } = body;

    //
    const allSummaries = await summariesService.findMany({
      where: { userId: userId! },
    });

    const monthlySummaries = getCurrentMonthSummaries(allSummaries);

    const incomeExpenseSummary = findSummaryByType(monthlySummaries, typeTitle);
    const savingSummary = findSummaryByType(monthlySummaries, "Saving");

    const deletedTransaction = await transactionServices.destroy({
      where: {
        userId: userId!,
        id: transactionId,
      },
    });

    if (!deletedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found or could not be deleted" },
        { status: 404 }
      );
    }

    const transactionAmount = deletedTransaction.amount ?? 0;

    await categoryServices.update({
      where: {
        userId: userId!,
        id: categoryId,
      },
      data: {
        count: {
          decrement: 1,
        },
      },
    });

    const newInExAmount =
      (incomeExpenseSummary.amount ?? 0) - transactionAmount;

    const newSavingAmount = (savingSummary.amount ?? 0) - transactionAmount;

    await Promise.all([
      await summariesService.updateOne({
        where: {
          id: incomeExpenseSummary.id,
        },
        data: {
          amount: newInExAmount,
        },
      }),
      await summariesService.updateOne({
        where: {
          id: savingSummary.id,
        },
        data: {
          amount: newSavingAmount,
        },
      }),
    ]);

    return NextResponse.json(
      {
        message: "Successfully delete transaction",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleErrorPrisma(error);
  }
};
