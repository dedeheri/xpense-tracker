import summariesServices from "@/services/summaries-service";
import filterTransactionByDate from "./summaries-by-date";
import percentSummaries from "./percent-summaries";
import calculateIncreaseStatus from "./calculate-increase";

export async function updateAllSummaries({ userId, typeTitle, parsedAmount }) {
  // 1. Ambil data yang dibutuhkan secara paralel
  const [allSummaries, savingSummaries] = await Promise.all([
    summariesServices.findMany({
      where: { userId, type: typeTitle },
      orderBy: { createdAt: "desc" },
      take: 2,
    }),
    summariesServices.findMany({
      where: { userId, type: "Saving" },
      orderBy: { createdAt: "desc" },
      take: 2,
    }),
  ]);

  // 2. Update Summary Income/Expense
  const typeFilter = filterTransactionByDate(allSummaries);
  const currentAmt = typeFilter?.currentMonth?.amount ?? 0;
  const lastAmt = typeFilter?.lastMonth?.amount ?? 0;

  const newTotalAmt = currentAmt + parsedAmount;
  const newPercent = percentSummaries(lastAmt, currentAmt, parsedAmount);

  const payload = {
    userId,
    type: typeTitle,
    amount: newTotalAmt,
    increase: calculateIncreaseStatus(currentAmt, newPercent),
    percent: newPercent,
  };

  if (typeFilter?.currentMonth) {
    await summariesServices.updateOne({
      where: { id: typeFilter.currentMonth.id },
      data: payload,
    });
  } else {
    await summariesServices.createOne({ data: payload });
  }

  // 3. Update Summary Saving
  const savingFilter = filterTransactionByDate(savingSummaries);
  const currentSavingAmt = savingFilter?.currentMonth?.amount ?? 0;
  const lastSavingAmt = savingFilter?.lastMonth?.amount ?? 0;

  const adjustment =
    typeTitle === "Income"
      ? currentSavingAmt + parsedAmount
      : currentSavingAmt - parsedAmount;

  console.log({ adjustment });

  const newSavingTotal = currentSavingAmt + adjustment;
  const newSavingPercent = percentSummaries(lastSavingAmt, currentSavingAmt);

  const savingPayload = {
    amount: newSavingTotal,
    increase: calculateIncreaseStatus(currentSavingAmt, newSavingPercent),
    percent: newSavingPercent,
  };

  if (savingFilter?.currentMonth) {
    await summariesServices.updateOne({
      where: { id: savingFilter.currentMonth.id },
      data: savingPayload,
    });
  } else {
    await summariesServices.createOne({
      data: { userId, type: "Saving", ...savingPayload },
    });
  }
}
