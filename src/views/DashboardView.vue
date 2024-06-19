<template>
  <div class="page-container">
    <div class="page-title">Hello, {{ authStore.name }}.</div>
    <div class="grid">
      <div class="sm:col-12 md:col-6 lg:col-4">
        <SubscribersOverview />
      </div>
      <div class="sm:col-12 md:col-6 lg:col-4">
        <SpotifyCurrentlyPlaying />
      </div>
      <div class="sm:col-12 md:col-6 lg:col-4">
        <DashboardShortcuts />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SubscribersOverview from '@/components/home/SubscribersOverview.vue';
import { useAuthStore } from '@/stores/auth.store';
import '@/styles/BasePage.scss';
import SpotifyCurrentlyPlaying from '@/components/home/SpotifyCurrentlyPlaying.vue';
import DashboardShortcuts from '@/components/home/DashboardShortcuts.vue';

const authStore = useAuthStore();
</script>

<style scoped lang="scss"></style>
