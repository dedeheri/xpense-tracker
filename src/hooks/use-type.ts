import { IFetcherError } from "@/types/fetcher-type";
import { IType } from "@/types/type-types";
import { standardFetchers } from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export const useType = () => {
  const { data, isLoading, error, mutate } = useSWR<IType, IFetcherError>(
    ["/api/type"],
    standardFetchers
  );

  const memorized = useMemo(
    () => ({
      types: data?.data,
      typesMessage: data?.message || error?.message,
      typesIsError: !data?.data?.length,
      typesLoading: isLoading,
      typesMutate: mutate,
    }),
    [data?.data, isLoading, error, mutate]
  );

  return memorized;
};
