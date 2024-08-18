<template>
  <div class="flex align-items-center justify-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-col align-items-center justify-center">
      <Card>
        <template #content>
          <div class="w-full py-8 px-5 sm:px-8 flex flex-col align-items-center rounded-2xl">
            <span class="font-bold text-3xl">
              <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
            </span>
            <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">Loading</h1>
            <div class="text-600 mb-5">Please wait</div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationService } from '@/api';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  if (route.path === '/auth/callback') {
    if (!route.hash) {
      await router.push({ name: 'auth' });
    }

    let queryParameters = new URLSearchParams(route.hash.substring(1));
    if (
      !queryParameters.get('code') ||
      !queryParameters.get('state') ||
      !queryParameters.get('session_state')
    ) {
      await router.push({ name: 'auth' });
    }

    // Get and clear sessionStorage
    let state = sessionStorage.getItem('state');
    let url = sessionStorage.getItem('url');
    sessionStorage.clear();

    // Check if the state is still the same, if not require to re-authenticate
    if (state !== queryParameters.get('state')) {
      await router.push({ name: 'auth' });
    }

    await authStore
      .OIDCLogin({
        authUrl: '',
        clientId: '',
        redirectUri: '',
        code: queryParameters.get('code')!,
        state: queryParameters.get('state')!,
        session_state: queryParameters.get('session_state')!
      })
      .then(() => {
        router.push(url!);
      })
      .catch(() => {
        router.push({ name: 'notFound' });
      });
  } else {
    // TODO replace with environment variables
    let state = uuidv4();
    sessionStorage.setItem('state', state);
    sessionStorage.setItem('url', route.query.path as string);

    const oidcParameters = await AuthenticationService.getOidcParameters();

    let queryParameters = new URLSearchParams({
      client_id: oidcParameters.clientId,
      redirect_uri: oidcParameters.redirectUri,
      state: state,
      response_mode: 'fragment',
      response_type: 'code',
      scope: 'openid'
    });

    window.location.href = oidcParameters.authUrl + '?' + queryParameters.toString();
  }
});
</script>
