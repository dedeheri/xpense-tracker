"use client";

import { dynamicFetcher, standardFetcher } from "@/lib/fetcher-swr";
import { IFetcherError } from "@/types/fetcher-type";
import { HttpMethod } from "@/types/hooks.types";
import { INet, ISummaries } from "@/types/summaries-types";
import { ITransaction, ITransactionFormData } from "@/types/transaction.types";

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
    transactionAddMessage: error?.message || data?.result?.message,
    transactionAddIsError: error?.isError || data?.isError,
    transactionAddTrigger: executeMutation,
  };
};

export const useTransaction = (params: {
  category?: string;
  type?: string;
  page?: string;
}) => {
  const { data, isLoading, error, mutate } = useSWR<
    ITransaction,
    IFetcherError
  >(["/api/transaction", params], standardFetcher);

  //  targetData: data?.data,
  // targetMessage: data?.message || error?.message,
  // targetIsStatus: error?.status,
  // targetIsError: error?.isError,
  // targetIsLoading: isLoading,

  const memoizedValue = useMemo(
    () => ({
      transactions: data?.data,
      transactionsMessage: error?.message || data?.message,
      transactionsIsStatus: error?.status,
      transactionsIsError: error?.isError,
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
      summariesMessage: error?.message || data?.message,
      summariesIsStatus: error?.status,
      summariesIsError: error?.isError,
      summariesIsLoading: isLoading,
      summariesMutate: mutate,
    }),
    [data, isLoading, error, mutate]
  );

  return memoized;
};

export const useNetTransaction = () => {
  const { data, isLoading, error, mutate } = useSWR<INet, IFetcherError>(
    ["/api/transaction/net"],
    standardFetcher
  );

  const memoized = useMemo(
    () => ({
      net: data?.data,
      netMessage: error?.message || data?.message,
      netIsStatus: error?.status,
      netIsError: error?.isError,
      netLoading: isLoading,
      netMutate: mutate,
    }),
    [data, isLoading, error, mutate]
  );

  return memoized;
};

export const useChartTransaction = (params: {
  category?: string;
  type?: string;
  page?: string;
}) => {
  const { data, isLoading, error, mutate } = useSWR<
    ITransaction,
    IFetcherError
  >(["/api/transaction/chart", params], standardFetcher);

  const memoizedValue = useMemo(
    () => ({
      chart: data?.data,
      chartMessage: error?.message || data?.message,
      chartStatus: error?.status,
      chartError: error?.isError,
      chartLoading: isLoading,
      chartTrigger: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
};

// delete transaction
export const useDeleteTransaction = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/transaction",
    dynamicFetcher
  );

  const executeMutation = (
    method: HttpMethod,
    data: { transactionId: string; categoryId: string; typeTitle: string }
  ) => {
    return trigger({ method, data });
  };

  return {
    transactionDeleteMutation: isMutating,
    transactionDeleteData: data,
    transactionDeleteMessage: error?.message || data?.result?.message,
    transactionDeleteIsError: error?.isError || data?.isError,
    transactionDeleteTrigger: executeMutation,
  };
};
