import { IGroupedTransaction, ITransactions } from "@/types/transaction.types";

export function groupTransactionsByMonth(
  transactions: ITransactions[]
): IGroupedTransaction[] {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const groups: Record<string, IGroupedTransaction> = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.createdAt);
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const groupKey = `${month} - ${year}`;

    if (!groups[groupKey]) {
      groups[groupKey] = {
        date: groupKey,
        total: 0,
        income: 0,
        expense: 0,
        transactions: [],
      };
    }

    groups[groupKey].transactions.push(tx);

    // Hitung income/expense
    if (tx.type.title === "Income") {
      groups[groupKey].income += tx.amount;
      groups[groupKey].total += tx.amount;
    } else if (tx.type.title === "Expense") {
      groups[groupKey].expense += tx.amount;
      groups[groupKey].total -= tx.amount;
    }
  });

  return Object.values(groups);
}
