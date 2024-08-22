import { PageName } from 'shared/lib/types/app/pages';
import type { RouteRecordRaw, Router } from 'vue-router';

export const moduleRoutes: RouteRecordRaw[] = [
  {
    path: '/profile',
    name: PageName.BASE_PROFILE,
    component: () => import('./pages/Index.vue'),
  },
  {
    path: '/main',
    name: PageName.BASE_MAIN,
    component: () => import('./pages/Main.vue'),
  },
];

export default (router: Router) => {
  moduleRoutes.forEach(route => router.addRoute(PageName.BASE_LAYOUT, route));
};
