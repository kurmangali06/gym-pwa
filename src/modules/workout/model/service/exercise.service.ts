import { useGlobalLoading } from 'shared/lib/composables/useLoading';
import { Executor } from 'shared/api/executor';
import { ExerciseRepository } from 'modules/workout/api/exercise.repository';

export function useExerciseService() {
  const loadingState = useGlobalLoading();

  async function getExerciseAll() {
    return Executor.run({
      request: ExerciseRepository.getExerciseAll(),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }

  async function createExercise(body: any) {
    return Executor.run({
      request: ExerciseRepository.createExercise(body),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }

  return {
    getExerciseAll,
    createExercise,
    isLoading: loadingState.isLoading,
  };
}
