import { useGlobalLoading } from 'shared/lib/composables/useLoading';
import { Executor } from 'shared/api/executor';
import { AuthRepository } from 'shared/repository/auth.repository';

export function useAuthService() {
  const loadingState = useGlobalLoading();

  async function authEmail(email: string) {
    return Executor.run({
      request: AuthRepository.authEmail(email),
      loadingState,
      onResult(data) {

      },
    });
  }

  return {
    authEmail,
  };
}
