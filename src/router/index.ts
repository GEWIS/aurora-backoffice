import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '@/layout/DashboardLayout.vue';
import AuthView from '@/views/AuthView.vue';
import DashboardView from '@/views/DashboardView.vue';
import RoomresponsibleView from '@/views/Infoscreen/RoomresponsibleView.vue';
import SettingsView from '@/views/Infoscreen/SettingsView.vue';
import PageNotFoundView from '@/views/PageNotFoundView.vue';
import { useAuthStore } from '@/stores/auth.store';
import UnauthorizedView from '@/views/UnauthorizedView.vue';
import EffectsController from '@/views/Lights/EffectsController.vue';
import CenturionModeView from '@/views/Modes/CenturionModeView.vue';
import PosterList from '@/views/Poster/PosterList.vue';
import TimeTrailRaceModeView from '@/views/Modes/TimeTrailRaceModeView.vue';
import ScenesController from '@/views/Lights/ScenesController.vue';

declare module 'vue-router' {
  interface RouteMeta {
    // must be declared by every route
    requiresAuth?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      children: [
        {
          path: '/auth',
          name: 'auth',
          component: AuthView,
          children: [
            {
              path: 'callback',
              component: AuthView,
              name: 'authCallback'
            }
          ]
        },
        {
          path: '/unauthorized',
          component: UnauthorizedView,
          name: 'unauthorized'
        }
      ]
    },
    {
      path: '',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: DashboardView,
          name: 'dashboard'
        },
        {
          path: '/infoscreen',
          children: [
            {
              path: 'settings',
              component: SettingsView,
              name: 'infoscreenSettings'
            },
            {
              path: 'roomresponsibles',
              component: RoomresponsibleView,
              name: 'infoscreenRoomresposibles'
            }
          ]
        },
        {
          path: '/poster',
          children: [
            {
              path: 'list',
              component: PosterList,
              name: 'posterList'
            }
          ]
        },
        {
          path: '/modes',
          children: [
            {
              path: 'centurion',
              component: CenturionModeView,
              name: 'centurionMode'
            },
            {
              path: 'timeTrailRace',
              component: TimeTrailRaceModeView,
              name: 'timeTrailRaceMode'
            }
          ]
        },
        {
          path: '/lights',
          children: [
            {
              path: 'effectsController',
              component: EffectsController,
              name: 'lightsEffectsController'
            },
            {
              path: 'scenesController',
              component: ScenesController,
              name: 'lightsScenesController'
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      meta: { requiresAuth: true },
      component: PageNotFoundView,
      name: 'notFound'
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  // Automatically login using mock when in development mode
  if (!import.meta.env.PROD && !authStore.isAuthenticated()) {
    await authStore.MockLogin();
  }
  const authenticated = authStore.isAuthenticated();
  const hasRights = authStore.roles && authStore.roles.length > 0;

  if (to.meta?.requiresAuth && !authenticated) {
    // If requires auth and not authenticated, redirect to login
    next({ name: 'auth', query: { path: to.fullPath } });
  } else if (to.meta?.requiresAuth && authenticated && !hasRights) {
    // If requires auth and is authenticated, but no rights
    next({ name: 'unauthorized' });
  } else if (!to.meta?.requiresAuth && authenticated && hasRights) {
    // If the route doesn't require authentication and the user is authenticated, redirect to home
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
