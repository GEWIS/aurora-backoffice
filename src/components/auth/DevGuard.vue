<template>
  <template v-if="authStore.getDevelopment">
    <slot />
  </template>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
</script>
