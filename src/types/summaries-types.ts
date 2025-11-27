export interface ISummariesDetails {
  expense: {
    amount: number;
    percent: number;
    increase: boolean;
  };
  income: {
    amount: number;
    percent: number;
    increase: boolean;
  };
  saving: {
    amount: number;
    percent: number;
    increase: boolean;
  };
}

export interface INetDetails {
  netIncome: number | null;
}

export interface ISummaries {
  data: ISummariesDetails;
  message: string | null;
}

export interface INet {
  data: INetDetails;
  message: string | null;
}
