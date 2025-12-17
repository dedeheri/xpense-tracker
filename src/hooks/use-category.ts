import { dynamicFetcher, standardFetcher } from "@/lib/fetcher-swr";
import { CategoryFormData, ICategory } from "@/types/category.types";
import { IFetcherError } from "@/types/fetcher-type";
import { HttpMethod } from "@/types/hooks.types";
import { useMemo } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useCategory = () => {
  const { data, isLoading, error, mutate } = useSWR<ICategory, IFetcherError>(
    ["/api/category"],
    standardFetcher
  );

  const memoizedValue = useMemo(
    () => ({
      categorys: data?.data,
      categorysMessage: data?.message || error?.message,
      categorysIsError: error?.isError,
      categorysIsStatus: error?.status,
      categorysLoading: isLoading,
      categorysTrigger: mutate,
    }),
    [data, isLoading, error, mutate]
  );

  return memoizedValue;
};

export const useAddCategory = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/category",
    dynamicFetcher
  );

  const executeMutation = (method: HttpMethod, data: CategoryFormData) => {
    return trigger({ data, method });
  };
  return {
    addCategoryMutation: isMutating,
    addCategoryTrigger: executeMutation,
    addCategoryMessage: error?.message || data?.result?.message,
    addCategoryIsError: error?.isError || data?.isError,
  };
};

export const useDeletedCategory = () => {
  const { trigger, isMutating, error, data } = useSWRMutation(
    "/api/category",
    dynamicFetcher
  );

  const executeMutation = (method: HttpMethod, data: CategoryFormData) => {
    return trigger({ data, method });
  };

  return {
    addDeletedCategoryMutating: isMutating,
    addDeletedCategoryTrigger: executeMutation,
    addDeletedCategoryError: error,
    addDeletedCategoryIsError: error?.isError,
    addDeletedCategoryMessage: error?.message || data?.result?.message,
  };
};
