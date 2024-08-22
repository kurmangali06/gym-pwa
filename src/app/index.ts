import 'app/assets/main.css';

import { createApp } from 'vue';
import Tres from '@tresjs/core';
import { setupI18n } from 'i18n/index';
import App from './App.vue';
import { registerModules } from './providers/register-modules';
import { store } from './providers/store';
import { router } from './providers/router/router';

export async function initialize() {
  const app = createApp(App);
  app.use(store);
  app.use(Tres);
  registerModules(router);
  await setupI18n(app);
  app.use(router);
  app.mount('#app');
}
