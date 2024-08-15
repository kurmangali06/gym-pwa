import { defineStore } from 'pinia';
import type { Locale } from 'shared/config/locale-config';
import { getPreferredLanguage } from 'shared/config/locale-config';
import { loadLanguageAsync } from 'i18n/index';
import { store } from 'app/providers/store';

export interface LocaleState {
  locale: Locale
}

const STORE_ID = 'locale';

export const useLocaleStore = defineStore(STORE_ID, {
  state: (): LocaleState => ({
    locale: getPreferredLanguage(),
  }),
  getters: {
  },
  actions: {
    async setLocale(value: Locale) {
      const newLocale = await loadLanguageAsync(value);

      this.locale = newLocale;

      return newLocale;
    },
    async initLocale() {
      await this.setLocale(this.locale);
    },
  },
  persist: {
    key: STORE_ID,
  },
});

// Need to be used outside the setup
export function useLocaleStoreOutside() {
  return useLocaleStore(store);
}
