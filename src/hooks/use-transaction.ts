"use client";

import { dynamicFetcher, standardFetcher } from "@/lib/fetcher-swr";
import { IFetcherError } from "@/types/fetcher-type";
import { HttpMethod } from "@/types/hooks.types";
import { INet, ISummaries } from "@/types/summaries-types";
import { ITransaction, ITransactionFormData } from "@/types/transaction.types";
import { standardFetchers } from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useAddTransaction = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/transaction",
    dynamicFetcher
  );

  const executeMutation = (method: HttpMethod, data: ITransactionFormData) => {
    return trigger({ data, method });
  };

  return {
    transactionAddMutation: isMutating,
    transactionAddData: data,
    transactionAddError: error,
    transactionAddMessage: data?.message,
    transactionAddIsError: data?.error,
    transactionAddTrigger: executeMutation,
  };
};

interface ITransactionParams {
  category?: string;
  type?: string;
  page?: string;
}

export const useTransaction = (params?: ITransactionParams) => {
  const { data, isLoading, error, mutate } = useSWR<
    ITransaction,
    IFetcherError
  >(["/api/transaction", params], standardFetchers);

  const memoizedValue = useMemo(
    () => ({
      transactions: data?.data,
      transactionsMessage: error?.message,
      transactionsErrorStatus: error?.status,
      transactionsError: error?.isError || error ? true : false,
      transactionsLoading: isLoading,
      transactionsMutate: mutate,
      pages: {
        currentPage: data?.currentPage,
        totalPages: data?.totalPages,
        totalItems: data?.totalItems,
      },
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
};

export const useSummariesTransaction = () => {
  const { data, isLoading, error, mutate } = useSWR<ISummaries, IFetcherError>(
    ["/api/transaction/summaries"],
    standardFetcher
  );

  const memoized = useMemo(
    () => ({
      summaries: data?.data,
      summariesMessage: error?.message,
      summariesIsError: error?.isError,
      summariesLoading: isLoading,
      summariesMutate: mutate,
    }),
    [data?.data, isLoading, error, mutate]
  );

  return memoized;
};

export const useNetTransaction = () => {
  const { data, isLoading, error, mutate } = useSWR<INet, IFetcherError>(
    ["/api/transaction/net"],
    standardFetcher
  );

  const result = {
    net: data?.data,
    message: error?.message,
    isError: error?.isError,
    isLoading: isLoading,
    isTrigger: mutate,
  };

  return result;
};

export const useChartTransaction = (params?: ITransactionParams) => {
  const { data, isLoading, error, mutate } = useSWR<
    ITransaction,
    IFetcherError
  >(["/api/transaction/chart", params], standardFetchers, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const memoizedValue = useMemo(
    () => ({
      chart: data?.data,
      chartMessage: error?.message,
      chartStatus: error?.status,
      chartError: error?.isError || error ? true : false,
      chartLoading: isLoading,
      chartTrigger: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
};
