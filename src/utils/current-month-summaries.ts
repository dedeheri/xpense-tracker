const getCurrentMonthSummaries = (summaries) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return summaries.filter((summary) => {
    const creationDate = new Date(summary.createdAt);
    return (
      creationDate.getMonth() === currentMonth &&
      creationDate.getFullYear() === currentYear // Tambahkan tahun untuk akurasi
    );
  });
};

export default getCurrentMonthSummaries;
