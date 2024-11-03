<template>
  <AppContainer icon="pi-image" title="Posters">
    <template #header>
      <PosterOperations />
    </template>
    <div class="w-full">
      <div v-if="store.isLoading">
        <Spinner />
      </div>
      <div v-else class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-5">
        <div v-for="poster in store.fetchPosters" :key="poster.name">
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
