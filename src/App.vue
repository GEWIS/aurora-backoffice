<template>
  <ConfirmDialog />
  <div v-if="authStore.authenticating">
    <LoadingView :authorizing="false" />
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import LoadingView from '@/views/Base/LoadingView.vue';

const authStore = useAuthStore();
</script>
