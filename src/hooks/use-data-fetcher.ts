import { Dispatch, useEffect, useState } from 'react';

export interface UseDataFetcherOptions<T> {
  serviceCall: () => Promise<T>;
  dependencies?: any[];
  conditionForExecution?: boolean;
  needsCleanUp?: boolean;
  onError?: (error: any) => void;
  onFinish?: (response: Awaited<T> | undefined) => Promise<void> | void;
}

export const useDataFetcher = <T>(
  options?: UseDataFetcherOptions<T>
): [
    data: T | undefined,
    isComponentLoading: boolean,
    setData: React.Dispatch<React.SetStateAction<T | undefined>>,
  ] => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setComponentIsLoading] = useState<boolean>(false);
  const onErrorHandle = (error: any) => {
    setComponentIsLoading(false);
    if (options?.onError) {
      options?.onError(error);
    }
  };
  let isCancelled = false;
  useEffect(() => {
    const executeIntegration = async () => {
      if (
        options?.conditionForExecution === undefined ||
        options?.conditionForExecution === true
      ) {
        try {
          setComponentIsLoading(true);
          await executeFetch<T>(options, isCancelled, setData);
        } catch (e: any) {
          onErrorHandle(e);
        } finally {
          setComponentIsLoading(false);
        }
      }
    };
    executeIntegration();
    if (options?.needsCleanUp) {
      return () => {
        isCancelled = true;
      };
    }
  }, options?.dependencies ?? []);

  return [data, isLoading, setData];
};

const executeFetch = async <T>(
  options: UseDataFetcherOptions<T> | undefined,
  isCancelled: boolean,
  setData: Dispatch<React.SetStateAction<T | undefined>>
) => {
  const response = await options?.serviceCall();
  if (!isCancelled) {
    setData(response);
    if (options?.onFinish) {
      await options?.onFinish(response);
    }
  }
};
