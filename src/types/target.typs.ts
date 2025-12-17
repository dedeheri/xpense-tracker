export interface ITarget {
  id?: string;
  userId?: string;
  amount?: number;
  goals: number;
  title: string;
  icon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITargetSWR {
  data: ITarget[];
  message: string;
}
