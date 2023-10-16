import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from "@/layout/DashboardLayout.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import PublicLayout from "@/layout/PublicLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: PublicLayout,
      children: [
        {
          path: '',
          component: LoginView,
          name: 'login'
        }
      ]
    },
    {
      path: '',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          component: HomeView,
          name: 'home'
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // const isAuthenticated = apiService.isAuthenticated()
  const isAuthenticated = false;

  if (to.meta?.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, redirect to login
    next({ name: 'login' });
  } else if (!to.meta?.requiresAuth && isAuthenticated) {
    // If the route doesn't require authentication and the user is authenticated, redirect to home
    next({ name: 'home' });
  } else {
    // Allow navigation to proceed
    next();
  }
});

export default router;
