import { PageName } from 'shared/lib/types/app/pages';
import type { RouteRecordRaw, Router } from 'vue-router';

export const moduleRoutes: RouteRecordRaw[] = [
  {
    path: '/workout/:date',
    name: PageName.BASE_WORKOUT,
    component: () => import('./pages/Index.vue'),
  },
];

export default (router: Router) => {
  moduleRoutes.forEach(route => router.addRoute(PageName.BASE_LAYOUT, route));
};
