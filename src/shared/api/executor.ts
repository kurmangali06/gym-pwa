import type { AxiosResponse } from 'axios';
import type { LoadingService } from 'shared/lib/types/app/app';
import { useGlobalLoading } from '../lib/composables/useLoading';

export enum LoadingType {
  Global = 'global',
}

export interface ExecutorOptions<T> {
  request: Promise<AxiosResponse<T>>
  loadingState?: LoadingService
  loadingType?: LoadingType
  ignoreError?: boolean
  detailedResponse?: boolean
  onResult?: (data: T) => void
  onError?: (error: any) => void
  onComplete?: () => void
}

const globalLoadingState = useGlobalLoading();

export abstract class Executor {
  static async run<T = any>(options: ExecutorOptions<T>): Promise<AxiosResponse<T>> {
    const {
      request,
      onResult,
      onError,
      onComplete,
    } = options;
    let { loadingState } = options;

    if (!loadingState)
      loadingState = globalLoadingState;

    const loading = (loading: boolean) => {
      if (loadingState)
        loading ? loadingState.startLoading() : loadingState.stopLoading();
    };

    const handleError = (error: AxiosResponse<T>) => {
      onError?.(error);
    };

    try {
      loading(true);

      const result = await request as AxiosResponse<T>;

      onResult?.(result.data);

      return result;
    } catch (error) {
      handleError(error as AxiosResponse<T>);

      return error as AxiosResponse<T>;
    } finally {
      loading(false);
      onComplete?.();
    }
  }
}
