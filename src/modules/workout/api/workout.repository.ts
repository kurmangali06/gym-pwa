import type { IMuscleValue } from 'shared/model/base.dto';
import { createCurrentWorkout, createExercise, deleteCurrentWorkout, deleteExercise, getAllWorkout, getCurrentWorkout, getWorkoutAll, updateCurrentWorkout } from '../../../api/service/workout';

export class WorkoutRepository {
  static async getWorkout() {
    const response = getAllWorkout();

    return response;
  }

  static async postWorkout(body: IMuscleValue) {
    const response = await createExercise(body);

    return response;
  }

  static async deleteWorkout(id: string) {
    const response = await deleteExercise(id);

    return response;
  }

  static async postCurrentWorkout(body: any) {
    const response = await createCurrentWorkout(body);

    return response;
  }

  static async updateWorkout(data: Date, body: any) {
    const response = await updateCurrentWorkout(data, body);

    return response;
  }

  static async CurrentWorkout(date: any) {
    const response = await getCurrentWorkout(date);

    return response;
  }

  static async getWorkoutsAll() {
    const response = await getWorkoutAll();

    return response;
  }

  static async deleteWorkoutExercise(data: Date) {
    const response = await deleteCurrentWorkout(data);

    return response;
  }
}
