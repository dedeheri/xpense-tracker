import { ITransactions } from "@/types/transaction.types";

interface GroupedTransaction {
  [key: string]: {
    groupDate: string;
    totalIncome: number;
    totalExpense: number;
    transactions: ITransactions[];
  };
}

// interface MonthlySummaryData {
//   groupDate: string; // Format 'YYYY-MM'
//   totalIncome: number;
//   totalExpense: number;
//   transactions: ITransactions[];
// }

function getDayName(adjustedDayIndex: number) {
  // Array nama hari sesuai urutan: 0=Senin, 6=Minggu
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // Pastikan indeks berada dalam rentang 0-6
  return dayNames[adjustedDayIndex];
}

function getMonthName(monthIndex: number) {
  // Array nama hari sesuai urutan: 0=Senin, 6=Minggu
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

  // Pastikan indeks berada dalam rentang 0-6
  return monthNames[monthIndex];
}

const groupAndCalculateTotals = (transactions: ITransactions[]) => {
  return transactions.reduce((groups: GroupedTransaction, transactions) => {
    const date = new Date(transactions.createdAt);

    const month = date.getMonth();
    const years = date.getFullYear();

    const MonthName = getMonthName(month);

    const key = `${MonthName} - ${years}`;

    if (!groups[key]) {
      groups[key] = {
        groupDate: key,
        totalIncome: 0,
        totalExpense: 0,
        transactions: [],
      };
    }

    if (transactions.type.title === "Income") {
      groups[key].totalIncome += transactions.amount;
    }

    if (transactions.type.title === "Expense") {
      groups[key].totalExpense += transactions.amount;
    }

    groups[key].transactions.push(transactions);

    return groups;
  }, {});
};

export default groupAndCalculateTotals;
