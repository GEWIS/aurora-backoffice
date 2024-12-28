<template>
  <BasePosterList :poster-store="store" :title="pageTitle" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGewisPosterStore } from '@/stores/poster/gewis-poster-store';
import BasePosterList from '@/views/Poster/BasePosterList.vue';
import { useServerSettingsStore } from '@/stores/server-settings.store';

const store = useGewisPosterStore();
store.init();

const serverSettingsStore = useServerSettingsStore();

const pageTitle = computed(() => {
  return serverSettingsStore.amountOfPosterScreenHandlers > 1 ? 'GEWIS Posters' : 'Posters';
});
</script>

<style scoped></style>
