import { useGlobalLoading } from 'shared/lib/composables/useLoading';
import { Executor } from 'shared/api/executor';
import { WorkoutRepository } from 'modules/workout/api/workout.repository';
import type { IMuscleValue } from 'shared/model/base.dto';
import { useWorkoutStore } from '../workout.store';

export function useWorkoutService() {
  const loadingState = useGlobalLoading();
  const workoutStore = useWorkoutStore();
  async function getWorkout() {
    return Executor.run({
      request: WorkoutRepository.getWorkout(),
      loadingState,
      onResult(data) {
        workoutStore.setWorkoutList(data as any);
      },
    });
  }

  async function createExercise(body: IMuscleValue) {
    return Executor.run({
      request: WorkoutRepository.postWorkout(body),
      loadingState,
      onResult() {
        getWorkout();
      },
    });
  }
  async function deleteExercise(id: string) {
    return Executor.run({
      request: WorkoutRepository.deleteWorkout(id),
      loadingState,
      onResult() {
        getWorkout();
      },
    });
  }
  async function createCurrentWorkout(body: any) {
    return Executor.run({
      request: WorkoutRepository.postCurrentWorkout(body),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }
  async function updateWorkout(date: Date, body: any) {
    return Executor.run({
      request: WorkoutRepository.updateWorkout(date, body),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }
  async function getCurrentWorkout(date: Date) {
    return Executor.run({
      request: WorkoutRepository.CurrentWorkout(date),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }
  async function getWorkoutsAll() {
    return Executor.run({
      request: WorkoutRepository.getWorkoutsAll(),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }

  async function deleteWorkoutExercise(data: Date) {
    return Executor.run({
      request: WorkoutRepository.deleteWorkoutExercise(data),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }
  return {
    getWorkout,
    createExercise,
    deleteExercise,
    createCurrentWorkout,
    getCurrentWorkout,
    isLoading: loadingState.isLoading,
    getWorkoutsAll,
    deleteWorkoutExercise,
    updateWorkout,
  };
}
