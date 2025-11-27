/* eslint-disable @typescript-eslint/no-explicit-any */

const calculateIncreaseStatus = (
  filterData: any,
  newPercent: number
): boolean => {
  const lastPercent = filterData?.lastMonth?.percent ?? 0;
  //   const currentPercent = filterData?.currentMonth?.percent ?? 0;

  // Logika sederhana: Cek apakah ada peningkatan dari bulan lalu,
  // atau apakah persentase baru menunjukkan pertumbuhan positif.
  if (filterData?.lastMonth) {
    return newPercent > lastPercent;
  }
  // Jika ini bulan pertama, anggap ada kenaikan jika persentase positif.
  return newPercent > 0;
};

export default calculateIncreaseStatus;
