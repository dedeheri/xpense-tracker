type ISummaries = {
  id: number;
  transaction: number;
  createdAt: Date;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const filterTransactionByDate = (transaction: any[]) => {
  const now = new Date();
  const startDateOfCurrentMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  let currentMonth: ISummaries | any;
  let lastMonth: ISummaries | any;

  if (transaction.length > 0) {
    // 1. Catatan terbaru (transaction[0])
    const latestRecord = transaction[0];
    if (latestRecord.createdAt >= startDateOfCurrentMonth) {
      currentMonth = latestRecord;
      if (transaction.length > 1) {
        lastMonth = transaction[1];
      }
    } else {
      lastMonth = latestRecord;
    }
  }

  return {
    currentMonth,
    lastMonth,
  };
};

export default filterTransactionByDate;
