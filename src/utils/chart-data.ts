import { ITransactions } from "@/types/transaction.types";

// Output yang dikelompokkan per tanggal
interface AggregatedOutput {
  date: string;
  [categoryTitle: string]: string | number; // Memungkinkan properti dinamis seperti "Shopping", "Foods", dll.
}

/**
 * Mengelompokkan transaksi berdasarkan tanggal dan menjumlahkan amount berdasarkan kategori.
 * @param transactions Array dari objek Transaction.
 * @returns Array dari objek AggregatedOutput.
 */
export function aggregateTransactionsByDay(
  transactions: ITransactions[]
): AggregatedOutput[] {
  // Peta untuk menyimpan data agregasi: { formattedDate: { date: string, Category1: amount, Category2: amount, ... } }
  const aggregationMap: { [date: string]: AggregatedOutput } = {};

  // Peta manual untuk terjemahan bulan (Opsional, jika Anda ingin menggunakan nama bulan Indonesia)
  const monthNames: { [key: number]: string } = {
    1: "Januari",
    2: "Februari",
    3: "Maret",
    4: "April",
    5: "Mei",
    6: "Juni",
    7: "Juli",
    8: "Agustus",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Desember",
  };

  for (const transaction of transactions) {
    const categoryTitle = transaction.category.title;
    const amount = transaction.amount;

    // 1. Ekstrak dan format tanggal
    const dateObject = new Date(transaction.createdAt);

    // Mengambil tanggal, bulan, dan tahun
    const month = dateObject.getMonth() + 1; // getMonth() mengembalikan 0-11
    const year = dateObject.getFullYear();

    // Format ke "DD Bulan YYYY"
    const formattedDate = `${monthNames[month]} ${year}`;

    // 2. Agregasi
    if (!aggregationMap[formattedDate]) {
      // Inisialisasi entri baru untuk tanggal ini
      aggregationMap[formattedDate] = { date: formattedDate };
    }

    // Ambil objek agregasi yang ada/baru
    const entry = aggregationMap[formattedDate];

    // Tambahkan amount ke kategori yang sesuai
    const currentCategoryAmount = (entry[categoryTitle] as number) || 0;
    entry[categoryTitle] = currentCategoryAmount + amount;
  }

  // 3. Konversi Peta (Map) ke Array
  return Object.values(aggregationMap);
}

// ... Tambahkan data input Anda di sini (misalnya: const data: Transaction[] = [...])
// ... Lalu panggil fungsi:
// const result = aggregateTransactionsByDay(data);
// console.log(result);
