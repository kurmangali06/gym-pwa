import { PageName } from 'shared/lib/types/app/pages';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: PageName.BASE_LAYOUT,
      redirect: { name: PageName.BASE_AUTH },
      component: () => import('shared/ui/layouts/TheDefaultLayout.vue'),
      children: [],
    },
  ],
});
