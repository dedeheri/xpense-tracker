const percentSummaries = (
  lastMonthAmount: number = 0,
  currentMonthSummary: number = 0,
  parsedAmount: number = 0
) => {
  if (lastMonthAmount === 0) return 100;

  const amount = currentMonthSummary + parsedAmount;
  const rawPercentage = ((amount - lastMonthAmount) / lastMonthAmount) * 100;

  return parseFloat(rawPercentage.toFixed(2));
};

export default percentSummaries;
