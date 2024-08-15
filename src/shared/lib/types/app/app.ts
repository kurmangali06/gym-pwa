import type { ComputedRef } from 'vue';

export type Nullable<T> = T | null | undefined;
export type Recordable<T = any> = Record<string, T>;

export interface DefaultModule<T = Recordable> {
  readonly default: T
}

export interface LoadingService {
  startLoading: () => void
  stopLoading: () => void
  isLoading: ComputedRef<boolean>
}
