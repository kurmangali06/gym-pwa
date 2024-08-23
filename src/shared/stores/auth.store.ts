import { store } from 'app/providers/store';
import { defineStore } from 'pinia';
import { useUserStore } from './user.store';

export interface AuthState {
  token: string | null
}

const STORE_ID = 'auth';

export const useAuthStore = defineStore(STORE_ID, {
  state: (): AuthState => ({
    token: null,
  }),
  getters: {
    isLoggedIn: state => !!state.token,
  },
  actions: {
    login(token: string) {
      this.token = token;
    },
    logout() {
      this.token = null;

      const userStore = useUserStore();
      userStore.setCurrentUser(null);
    },
  },
  persist: {
    key: STORE_ID,
  },
});

// Need to be used outside the setup
export function useAuthStoreOutside() {
  return useAuthStore(store);
}
