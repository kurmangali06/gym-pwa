import { PageName } from 'shared/lib/types/app/pages';
import type { RouteRecordRaw, Router } from 'vue-router';

export const moduleRoutes: RouteRecordRaw[] = [
  {
    path: '/workout',
    name: PageName.BASE_SELECT,
    component: () => import('./pages/Workout.vue'),
  },
  {
    path: '/list',
    name: PageName.BASE_LIST,
    component: () => import('./pages/MyList.vue'),
  },
  {
    path: '/workout/:types',
    name: PageName.BASE_WORKOUT,
    component: () => import('./pages/Index.vue'),
  },
  {
    path: '/exercise/:type/:name',
    name: PageName.BASE_EXERCISE,
    component: () => import('./pages/Exercise.vue'),
  },
];

export default (router: Router) => {
  moduleRoutes.forEach(route => router.addRoute(PageName.BASE_LAYOUT, route));
};
