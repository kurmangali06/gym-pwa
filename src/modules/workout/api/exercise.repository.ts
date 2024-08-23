import { createExercise, deleteExercise, getExerciseAll, updateExercise } from 'src/api/service/exercise';

export class ExerciseRepository {
  static async getExerciseAll(list: string[]) {
    const response = getExerciseAll(list);

    return response;
  }

  static async createExercise(body: any) {
    const response = createExercise(body);

    return response;
  }

  static async updateExercise(id: number, body: any) {
    const response = updateExercise(id, body);

    return response;
  }

  static async deleteExercise(id: number) {
    const response = deleteExercise(id);

    return response;
  }
}
