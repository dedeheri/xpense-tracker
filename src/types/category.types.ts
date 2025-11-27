export interface CategoryItems {
  id: string;
  title: string;
  icon: string;
  count?: number;
}

export interface CatergoryList {
  data: CategoryItems[];
  message: string;
  isLoading: boolean;
  error: boolean | null;
}

export interface ICategory {
  data: CategoryItems[] | null; // This holds the list of types
  message: string | null; // This holds any success message
  // You might also include a 'status' or 'success' field here
}

export interface NewCategory {
  message?: string;
  isLoading?: boolean;
  status?: boolean;
  error?: boolean | null;
}

export interface CategoryFormData {
  id?: string;
  title?: string;
  icon?: string;
}
