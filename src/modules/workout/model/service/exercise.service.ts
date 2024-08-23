import { useGlobalLoading } from 'shared/lib/composables/useLoading';
import { Executor } from 'shared/api/executor';
import { ExerciseRepository } from 'modules/workout/api/exercise.repository';
import { useWorkoutStore } from '../workout.store';
import type { Exercise } from '../utils/constants';

export function useExerciseService() {
  const loadingState = useGlobalLoading();
  const workoutStore = useWorkoutStore();
  async function getExerciseAll(list: string[]) {
    return Executor.run({
      request: ExerciseRepository.getExerciseAll(list),
      loadingState,
      onResult(data) {
        workoutStore.setMuscleList(data as Exercise[]);
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

  async function deleteExercise(id: number) {
    return Executor.run({
      request: ExerciseRepository.deleteExercise(id),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }
  async function updateExercise(id: number, body: any) {
    return Executor.run({
      request: ExerciseRepository.updateExercise(id, body),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }
  return {
    getExerciseAll,
    createExercise,
    deleteExercise,
    updateExercise,
    isLoading: loadingState.isLoading,
  };
}
