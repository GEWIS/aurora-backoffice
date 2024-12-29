<template>
  <BasePosterList :poster-store="store" :title="pageTitle" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHubblePosterStore } from '@/stores/poster/hubble-poster-store';
import BasePosterList from '@/views/Poster/BasePosterList.vue';
import { useServerSettingsStore } from '@/stores/server-settings.store';

const store = useHubblePosterStore();
store.init();

const serverSettingsStore = useServerSettingsStore();

const pageTitle = computed(() => {
  return serverSettingsStore.amountOfPosterScreenHandlers > 1 ? 'Hubble Posters' : 'Posters';
});
</script>

<style scoped></style>
