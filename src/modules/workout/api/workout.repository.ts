import type { IMuscleValue } from 'shared/model/base.dto';
import { createCurrentWorkout, createExercise, deleteExercise, getAllWorkout } from '../../../api/service/workout';

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
}
