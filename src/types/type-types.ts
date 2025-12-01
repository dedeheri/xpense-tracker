export interface TypeItem {
  id: string; // Example property
  title: string; // Example property
  icon: string;

  createdAt: string;
  updatedAt: string;
}

export interface TypeList {
  data: TypeItem[];
  message: string;
  isLoading: boolean;
  error: boolean | null;
}

export interface IType {
  data: TypeItem[] | null;
  message: string | null;
}
