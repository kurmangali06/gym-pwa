import type { LoadingService } from 'shared/lib/types/app/app';
import { useGlobalLoading } from '../lib/composables/useLoading';

export enum LoadingType {
  Global = 'global',
}

export interface ExecutorOptions<T> {
  request: Promise<T>
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
  static async run<T = any>(options: ExecutorOptions<T>): Promise<T> {
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

    const handleError = (error: any) => {
      onError?.(error);
    };

    try {
      loading(true);

      const result = await request;

      onResult?.(result);

      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      loading(false);
      onComplete?.();
    }
  }
}
