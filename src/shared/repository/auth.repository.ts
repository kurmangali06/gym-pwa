import type { IAuth } from 'shared/model/base.dto';
import { authEmail, createUser, resetPassword } from 'src/api/service/auth';

export class AuthRepository {
  static async authEmail(body: IAuth) {
    const response = authEmail(body);

    return response;
  }

  static async createUser(body: IAuth) {
    const response = createUser(body);

    return response;
  }

  static async resetPassword(body: IAuth) {
    const response = resetPassword(body);

    return response;
  }
}
