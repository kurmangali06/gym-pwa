import { defineStore } from 'pinia';
import type { UserDTO } from 'shared/model/dto/user.dto';

export interface UserState {
  user: UserDTO | null
}

const STORE_ID = 'user';

export const useUserStore = defineStore(STORE_ID, {
  state: (): UserState => ({
    user: null,
  }),
  getters: {
    getCurrentUser: (state) => {
      return state.user;
    },
  },
  actions: {
    setCurrentUser(user: UserDTO | null) {
      this.user = user;
    },
  },
  persist: {
    key: STORE_ID,
  },
});
