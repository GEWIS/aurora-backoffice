<template>
  <div>
    <main>
      <img id="login-image" src="../assets/img/AVICO.svg" alt="logo" />
      <hr />
      <Spinner id="login-image" />
    </main>
    <CopyrightBanner />
  </div>
</template>

<script setup lang="ts">
import CopyrightBanner from '@/layout/CopyrightBanner.vue';
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

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
}

h1 {
  color: black;
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

#login-image {
  max-height: 150px;

  display: block;
  margin: 0 auto;
}

:root[data-theme='dark'] #login-image {
  filter: invert(0.9);
}

main {
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 350px;
  margin: 4rem auto;
}

.p-button {
  margin: 1rem auto;
  max-width: 350px;
  width: 100%;
  max-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#gewis-branding {
  max-height: 24px;
  margin-right: 1rem;
}

label {
  color: black;
  margin-bottom: 0.5rem;
}

hr {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  max-width: 350px;
  width: 100%;
}

.p-inputtext {
  margin-bottom: 0.5rem;
}
</style>
