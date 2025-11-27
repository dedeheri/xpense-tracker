interface Category {
  id: string;
  userId: string;
  title: string;
  icon: string;
  count: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface Type {
  id: string;
  icon: string;
  userId: string;
  title: "Expense" | "Income" | string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ITransactions {
  id: string;
  userId: string;
  amount: number;
  note?: string | null;
  typeId: string;
  type: Type;
  category: Category;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MonthlySummaryData {
  date: string; // Format 'YYYY-MM'
  total: number;
  transactions: ITransactions[]; // Array dari detail transaksi penuh
}

export interface ITransaction {
  data: MonthlySummaryData[];
  message: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ITransactionFormData {
  typeId: string;
  categoryId: string;
  note: string;
  amount: number;
}

export type IGroupedTransaction = {
  date: string;
  total: number;
  income: number;
  expense: number;
  transactions: ITransactions[];
};
