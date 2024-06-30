import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

declare module 'vue-router' {
  interface RouteMeta {
    // must be declared by every route
    requiresAuth?: boolean;
  }
}
import AppLayout from '@/layout/AppLayout.vue';
import { useLayoutStore } from '@/stores/layout.store';
import { usePrimeVue } from 'primevue/config';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      children: [
        {
          path: '/auth',
          name: 'auth',
          component: () => import('@/views/Base/AuthView.vue'),
          children: [
            {
              path: 'callback',
              component: () => import('@/views/Base/AuthView.vue'),
              name: 'authCallback'
            }
          ]
        },
        {
          path: '/unauthorized',
          component: () => import('@/views/Base/UnauthView.vue'),
          name: 'unauthorized'
        }
      ]
    },
    {
      path: '',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('@/views/Base/DashboardView.vue'),
          name: 'dashboard'
        },
        {
          path: '/infoscreen',
          children: [
            {
              path: 'settings',
              component: () => import('@/views/Infoscreen/SettingsView.vue'),
              name: 'infoscreenSettings'
            },
            {
              path: 'roomresponsibles',
              component: () => import('@/views/Infoscreen/RoomresponsibleView.vue'),
              name: 'infoscreenRoomresposibles'
            }
          ]
        },
        {
          path: '/poster',
          children: [
            {
              path: 'list',
              component: () => import('@/views/Poster/PosterList.vue'),
              name: 'posterList'
            }
          ]
        },
        {
          path: '/modes',
          children: [
            {
              path: 'centurion',
              component: () => import('@/views/Modes/CenturionModeView.vue'),
              name: 'centurionMode'
            },
            {
              path: 'timeTrailRace',
              component: () => import('@/views/Modes/TimeTrailRaceModeView.vue'),
              name: 'timeTrailRaceMode'
            }
          ]
        },
        {
          path: '/lights',
          children: [
            {
              path: 'effects',
              component: () => import('@/views/Lights/EffectsController.vue'),
              name: 'lightEffects'
            },
            {
              path: 'scenesController',
              component: () => import('@/views/Lights/ScenesController.vue'),
              name: 'lightsScenesController'
            },
            {
              path: 'fixtures',
              component: () => import('@/views/Lights/FixtureOverview.vue'),
              name: 'fixturesOverview'
            }
          ]
        },
        {
          path: '/audit',
          component: () => import('@/views/Audit/AuditLogsView.vue'),
          name: 'AuditLogs'
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      meta: { requiresAuth: true },
      component: () => import('@/views/Base/NotFound.vue'),
      name: 'notFound'
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const layoutStore = useLayoutStore();
  layoutStore.init(usePrimeVue());

  const authStore = useAuthStore();
  // Automatically login using mock when in development mode
  if (!import.meta.env.PROD && !authStore.isAuthenticated()) {
    await authStore.MockLogin();
  }
  const authenticated = authStore.isAuthenticated();
  const hasRights = authStore.roles && authStore.roles.length > 0;

  if (to.meta?.requiresAuth && !authenticated) {
    // If it requires auth and not authenticated, redirect to login
    next({ name: 'auth', query: { path: to.fullPath } });
  } else if (to.meta?.requiresAuth && authenticated && !hasRights) {
    // If it requires auth and is authenticated, but no rights
    next({ name: 'unauthorized' });
  } else if (!to.meta?.requiresAuth && authenticated && hasRights) {
    // If the route doesn't require authentication and the user is authenticated, redirect to home
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
