import { dynamicFetcher } from "@/lib/fetcher-swr";
import { CategoryFormData, ICategory } from "@/types/category.types";
import { IFetcherError } from "@/types/fetcher-type";
import { HttpMethod } from "@/types/hooks.types";
import { standardFetchers } from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useCategory = () => {
  const { data, isLoading, error, mutate } = useSWR<ICategory, IFetcherError>(
    ["/api/category"],
    standardFetchers
  );

  const memoizedValue = useMemo(
    () => ({
      categorys: data?.data,
      categorysMessage: data?.message || error?.message,
      categorysIsError: !data?.data?.length,
      categorysLoading: isLoading,
      categorysTrigger: mutate,
    }),
    [data, isLoading, error, mutate]
  );

  return memoizedValue;
};

export const useAddCategory = () => {
  const { trigger, isMutating, data, reset } = useSWRMutation(
    "/api/category",
    dynamicFetcher
  );

  const executeMutation = (method: HttpMethod, data: CategoryFormData) => {
    return trigger({ data, method });
  };

  return {
    addCategoryMutation: isMutating,
    addCategoryTrigger: executeMutation,
    addCategoryData: data?.[0],
    addCategoryReset: reset,
    addCategoryError: data?.[0]?.message?.trim().length > 0 ? true : false,
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
    addDeletedCategoryData: data?.[0],
    addDeletedCategoryError: error,
    addDeletedCategoryIsError: data?.[0]?.error,
    addDeletedCategoryMessage: data?.[0]?.message || data?.[0]?.error,
  };
};
