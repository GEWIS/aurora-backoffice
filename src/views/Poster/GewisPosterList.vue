<template>
  <BasePosterList :poster-store="store" :title="pageTitle" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCarouselPosterStore } from '@/stores/carousel-poster-store';
import BasePosterList from '@/views/Poster/BasePosterList.vue';
import { useServerSettingsStore } from '@/stores/server-settings.store';

const store = useCarouselPosterStore();
store.init();

const serverSettingsStore = useServerSettingsStore();

const pageTitle = computed(() => {
  return serverSettingsStore.amountOfPosterScreenHandlers > 1 ? 'GEWIS Posters' : 'Posters';
});
</script>

<style scoped></style>
