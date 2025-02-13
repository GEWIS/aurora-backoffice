import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import AppLayout from '@/layout/AppLayout.vue';
import { useLayoutStore } from '@/stores/layout.store';
import { type ISecurityGroups, type ISecuritySections, SecurityGroup } from '@/api';

declare module 'vue-router' {
  interface RouteMeta {
    securityGroup: keyof ISecurityGroups;
    securitySection: keyof ISecuritySections;
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
          component: () => import('@/views/Base/AuthView.vue'),
          children: [
            {
              path: 'callback',
              component: () => import('@/views/Base/AuthView.vue'),
              name: 'authCallback',
            },
          ],
        },
        {
          path: '/unauthorized',
          component: () => import('@/views/Base/UnauthorizedView.vue'),
          name: 'unauthorized',
        },
      ],
    },
    {
      path: '',
      component: AppLayout,
      children: [
        {
          path: '',
          component: () => import('@/views/Base/DashboardView.vue'),
          name: 'dashboard',
        },
        {
          path: '/poster',
          children: [
            {
              path: 'gewis',
              component: () => import('@/views/Poster/GewisPosterList.vue'),
              name: 'gewisPosterList',
            },
            {
              path: 'hubble',
              component: () => import('@/views/Poster/HubblePosterList.vue'),
              name: 'hubblePosterList',
            },
          ],
          meta: {
            securityGroup: 'poster',
            securitySection: 'base',
          },
        },
        {
          path: '/modes',
          children: [
            {
              path: 'centurion',
              component: () => import('@/views/Modes/CenturionModeView.vue'),
              name: 'centurionMode',
              meta: {
                securityGroup: 'centurion',
                securitySection: 'privileged',
              },
            },
            {
              path: 'timeTrailRace',
              component: () => import('@/views/Modes/TimeTrailRaceModeView.vue'),
              name: 'timeTrailRaceMode',
              meta: {
                securityGroup: 'timetrail',
                securitySection: 'base',
              },
            },
          ],
        },
        {
          path: '/lights',
          children: [
            {
              path: 'effects',
              component: () => import('@/views/Lights/EffectsController.vue'),
              name: 'lightEffects',
              meta: {
                securityGroup: 'effects',
                securitySection: 'base',
              },
            },
            {
              path: 'scenesController',
              component: () => import('@/views/Lights/ScenesController.vue'),
              name: 'lightsScenesController',
              meta: {
                securityGroup: 'scenes',
                securitySection: 'base',
              },
            },
            {
              path: 'fixtures',
              component: () => import('@/views/Lights/FixtureOverview.vue'),
              name: 'fixturesOverview',
              meta: {
                securityGroup: 'handler',
                securitySection: 'base',
              },
            },
          ],
        },
        {
          path: '/settings',
          component: () => import('@/views/Base/ServerSettingsView.vue'),
          name: 'ServerSettings',
          meta: {
            securityGroup: 'serverSettings',
            securitySection: 'privileged',
          },
        },
        {
          path: '/timed-events',
          component: () => import('@/views/Base/TimedEventsView.vue'),
          name: 'TimedEvents',
          meta: {
            securityGroup: 'timedEvents',
            securitySection: 'privileged',
          },
        },
        {
          path: '/audit',
          component: () => import('@/views/Audit/AuditLogsView.vue'),
          name: 'AuditLogs',
          meta: {
            securityGroup: 'audit',
            securitySection: 'base',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Base/NotFoundView.vue'),
      name: 'notFound',
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // TODO; move some of this check away from router
  const layoutStore = useLayoutStore();
  layoutStore.init();

  const authStore = useAuthStore();
  // Automatically login using mock when in development mode
  if (!import.meta.env.PROD && !authStore.isAuthenticated()) {
    await authStore.MockLogin({
      id: 'dev',
      name: 'dev',
      roles: [SecurityGroup.ADMIN],
    });
    await authStore.initStores();
  }

  // Getting whether authenticated and has rights to access the route
  const authenticated = authStore.isAuthenticated();
  let hasRights = true;
  if (to.meta.securityGroup && to.meta.securitySection) {
    hasRights = authStore.isInSecurityGroup(to.meta.securityGroup, to.meta.securitySection);
  }

  if (!authenticated && !to.path.startsWith('/auth')) {
    // If not authenticated; redirect to login
    next({ name: 'auth', query: { path: to.fullPath } });
  } else if (authenticated && !hasRights) {
    // If authenticated, but does not have rights to access the route
    next({ name: 'unauthorized' });
  } else {
    // Default case
    next();
  }
});

export default router;
