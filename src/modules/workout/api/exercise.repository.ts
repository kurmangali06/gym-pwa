import { createExercise, getExerciseAll } from 'src/api/service/exercise';

export class ExerciseRepository {
  static async getExerciseAll() {
    const response = getExerciseAll();

    return response;
  }

  static async createExercise(body: any) {
    const response = createExercise(body);

    return response;
  }
}
