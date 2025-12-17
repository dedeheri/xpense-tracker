import { dynamicFetcher, standardFetcher } from "@/lib/fetcher-swr";
import { IFetcherError } from "@/types/fetcher-type";
import { HttpMethod } from "@/types/hooks.types";
import { ITarget, ITargetSWR } from "@/types/target.typs";

import { useMemo } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useTarget = () => {
  const { data, error, isLoading } = useSWR<ITargetSWR, IFetcherError>(
    ["/api/target"],
    standardFetcher
  );

  const memoizedValue = useMemo(
    () => ({
      targetData: data?.data,
      targetMessage: data?.message || error?.message,
      targetIsStatus: error?.status,
      targetIsError: error?.isError,
      targetIsLoading: isLoading,
    }),
    [data, error, isLoading]
  );

  return memoizedValue;
};

export const useAddTarget = () => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    "/api/target",
    dynamicFetcher
  );

  const executeMutation = (method: HttpMethod, data: ITarget) => {
    return trigger({ data, method });
  };

  return {
    error: error,
    addTargetMassage: error?.message || data?.result?.message,
    addTargetMutation: isMutating,
    addTargetTrigger: executeMutation,
    addTargetData: data,
    addTargetReset: reset,
    addTargetIsStatus: error?.status || data?.isStatus,
    addTargetIsSError: error?.isError || data?.isError,
  };
};
