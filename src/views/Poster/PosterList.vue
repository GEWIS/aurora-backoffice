<template>
  <AppContainer icon="pi-image" title="Posters">
    <template #header>
      <PosterOperations />
    </template>
    <div class="flex flex-column full-width gap-4">
      <div v-if="store.loading">
        <Spinner />
      </div>
      <div v-else class="grid">
        <div
          v-for="poster in store.posters"
          :key="poster.name"
          class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2"
        >
          <PosterCard :poster="poster" />
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { usePosterStore } from '@/stores/poster-store';
import PosterOperations from '@/components/poster/PosterOperations.vue';
import PosterCard from '@/components/poster/PosterCard.vue';
import AppContainer from '@/layout/AppContainer.vue';

const store = usePosterStore();
store.init();
</script>

<style scoped></style>
