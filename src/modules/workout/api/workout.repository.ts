import { createCurrentWorkout, deleteCurrentWorkout, getAllWorkout, getCurrentWorkout, getWorkoutAll, updateCurrentWorkout } from '../../../api/service/workout';

export class WorkoutRepository {
  static async getWorkout() {
    const response = getAllWorkout();

    return response;
  }

  static async postCurrentWorkout(body: any) {
    const response = await createCurrentWorkout(body);

    return response;
  }

  static async updateWorkout(id: number, body: any) {
    const response = await updateCurrentWorkout(id, body);

    return response;
  }

  static async CurrentWorkout(date: string) {
    const response = await getCurrentWorkout(date);

    return response;
  }

  static async getWorkoutsAll() {
    const response = await getWorkoutAll();

    return response;
  }

  static async deleteWorkoutExercise(id: number) {
    const response = await deleteCurrentWorkout(id);

    return response;
  }
}
