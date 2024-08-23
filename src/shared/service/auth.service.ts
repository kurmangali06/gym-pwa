import { useGlobalLoading } from 'shared/lib/composables/useLoading';
import { Executor } from 'shared/api/executor';
import { AuthRepository } from 'shared/repository/auth.repository';
import type { IAuth } from 'shared/model/base.dto';

export function useAuthService() {
  const loadingState = useGlobalLoading();

  async function authEmail(body: IAuth) {
    return Executor.run({
      request: AuthRepository.authEmail(body),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }

  async function createUser(body: IAuth) {
    return Executor.run({
      request: AuthRepository.createUser(body),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }
  async function resetPassword(body: IAuth) {
    return Executor.run({
      request: AuthRepository.resetPassword(body),
      loadingState,
      onResult(data) {
        return data;
      },
    });
  }

  return {
    authEmail,
    createUser,
    resetPassword,
  };
}
