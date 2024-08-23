import { useGlobalLoading } from 'shared/lib/composables/useLoading';
import { Executor } from 'shared/api/executor';
import { AuthRepository } from 'shared/repository/auth.repository';
import type { IAuth } from 'shared/model/base.dto';
import { useAuthStore } from 'shared/stores/auth.store';
import { PageName } from 'shared/lib/types/app/pages';

export function useAuthService() {
  const loadingState = useGlobalLoading();
  const route = useRoute();
  const router = useRouter();

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
        const authStore = useAuthStore();
        if (data?.session?.access_token)
          authStore.login(data?.session?.access_token);
        const routeLocation = route.query.redirect ? { path: route.query.redirect as string } : { name: PageName.BASE_SELECT };
        router.push(routeLocation);
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
