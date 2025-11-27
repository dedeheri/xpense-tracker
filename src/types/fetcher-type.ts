/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IFetcherError extends Error {
  info: unknown;
  status: number;
  isError: boolean;
  message: any;
}
