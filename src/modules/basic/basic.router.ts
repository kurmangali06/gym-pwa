import { PageName } from 'shared/lib/types/app/pages';
import type { RouteRecordRaw, Router } from 'vue-router';

export const moduleRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: PageName.BASE_HOME,
    component: () => import('modules/basic/pages/AboutPage.vue'),
  },
  {
    path: '/auth',
    name: PageName.BASE_AUTH,
    component: () => import('modules/basic/pages/Auth.vue'),
  },
  {
    path: '/singin',
    name: PageName.BASE_SING_IN,
    component: () => import('modules/basic/pages/SingIn.vue'),
  },
  {
    // Important! Slash prefix ensures that route will be root and child of ErrorPage in same time
    path: '/:catchAll(.*)*',
    name: 'Error404',
    component: () => import('modules/basic/pages/Error404.vue'),
  },
];

export default (router: Router) => {
  moduleRoutes.forEach(route => router.addRoute(PageName.BASE_LAYOUT, route));
};
