import { authEmail } from 'src/api/service/workout';

export class AuthRepository {
  static async authEmail(email: string) {
    const response = authEmail(email);

    return response;
  }
}
