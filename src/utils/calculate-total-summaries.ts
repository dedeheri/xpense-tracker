const calculateTotalSummaries = <T extends Record<string, unknown>>(
  transactions: T[]
) => {
  return transactions.reduce((acc: number, curr: T) => {
    const value =
      typeof curr?.amount === "number" ? (curr?.amount as number) : 0;
    return acc + value;
  }, 0);
};

export default calculateTotalSummaries;
