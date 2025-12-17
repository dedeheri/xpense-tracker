import { standardFetcher } from "@/lib/fetcher-swr";
import { IFetcherError } from "@/types/fetcher-type";
import { IType } from "@/types/type-types";
import { useMemo } from "react";
import useSWR from "swr";

export const useType = () => {
  const { data, isLoading, error, mutate } = useSWR<IType, IFetcherError>(
    ["/api/type"],
    standardFetcher
  );

  const memorized = useMemo(
    () => ({
      types: data?.data,
      typesMessage: data?.message || error?.message,
      typesIsError: error?.isError,
      typeIsStatus: error?.status,
      typesLoading: isLoading,
      typesMutate: mutate,
    }),
    [data, isLoading, error, mutate]
  );

  return memorized;
};
