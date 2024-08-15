import type { LoadingService } from '../types/app/app';

const state = reactive({
  globalLoadingCount: 0,
});

function useLoadingControls(loadingCountRef: Ref<number>): LoadingService {
  const isLoading = computed(() => loadingCountRef.value > 0);

  const startLoading = () => {
    loadingCountRef.value += 1;
  };
  const stopLoading = () => {
    // Prevent fast jumps
    setTimeout(() => {
      if (loadingCountRef.value > 0)
        loadingCountRef.value -= 1;
    });
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}

export function useGlobalLoading() {
  return useLoadingControls(toRef(state, 'globalLoadingCount'));
}

export function useLoading() {
  const loadingCount = ref(0);
  return useLoadingControls(loadingCount);
}
