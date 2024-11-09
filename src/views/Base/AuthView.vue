<template>
  <div class="flex align-items-center justify-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-col align-items-center justify-center">
      <Card>
        <template #content>
          <div class="w-full py-8 px-5 sm:px-8 flex flex-col align-items-center rounded-2xl">
            <div v-if="authorizing" class="text-900 font-bold text-3xl lg:text-5xl mb-5">
              Authorizing
            </div>
            <div v-else class="text-900 font-bold text-3xl lg:text-5xl mb-5">Connecting</div>
            <span class="font-bold text-3xl">
              <ProgressBar mode="indeterminate" style="height: 6px" />
            </span>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { getOidcParameters } from '@/api';

const authorizing = ref<boolean>(true);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  if (route.path === '/auth/callback') {
    authorizing.value = true;
    if (!route.hash) {
      await router.push({ name: 'auth' });
    }

    const queryParameters = new URLSearchParams(route.hash.substring(1));
    if (!queryParameters.get('code') || !queryParameters.get('state') || !queryParameters.get('session_state')) {
      await router.push({ name: 'auth' });
    }

    // Get and clear sessionStorage
    const state = sessionStorage.getItem('state');
    const url = sessionStorage.getItem('url');
    sessionStorage.clear();

    // Check if the state is still the same, if not require to re-authenticate
    if (state !== queryParameters.get('state')) {
      await router.push({ name: 'auth' });
    }

    await authStore
      .OIDCLogin({
        code: queryParameters.get('code')!,
        state: queryParameters.get('state')!,
        session_state: queryParameters.get('session_state')!,
      })
      .then(() => {
        authStore.init();
        if (url === '') url = { name: 'dashboard' };
        router.push(url);
      })
      .catch(() => {
        void router.push({ name: 'notFound' });
      });
  } else {
    authorizing.value = false;
    let state = Math.random().toString(36).slice(2);
    sessionStorage.setItem('state', state);
    sessionStorage.setItem('url', route.query.path ?? '');

    const oidcParameters = await getOidcParameters();
    // If the oidc parameters are not available, retry auth
    if (!oidcParameters.data) await router.push({ name: 'auth' });

    const queryParameters = new URLSearchParams({
      client_id: oidcParameters.data!.clientId,
      redirect_uri: oidcParameters.data!.redirectUri,
      state: state,
      response_mode: 'fragment',
      response_type: 'code',
      scope: 'openid',
    });

    console.log(oidcParameters.data!.authUrl + '?' + queryParameters.toString());
    window.location.href = oidcParameters.data!.authUrl + '?' + queryParameters.toString();
  }
});
</script>
