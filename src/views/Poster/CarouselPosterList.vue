<template>
  <AppContainer icon="pi-image" title="Carousel Posters">
    <template #header>
      <PosterOperations :store="posterStore" />
    </template>
    <div class="w-full">
      <div v-if="posterStore.isLoading">
        <Spinner />
      </div>
      <div v-else class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-5">
        <div v-for="poster in posterStore.fetchPosters" :key="poster.name">
          <PosterCard :poster="poster" />
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import PosterOperations from '@/components/poster/PosterOperations.vue';
import PosterCard from '@/components/poster/PosterCard.vue';
import AppContainer from '@/layout/AppContainer.vue';
import { useCarouselPosterStore } from '@/stores/carousel-poster-store';

const posterStore = useCarouselPosterStore();
void posterStore.init();
</script>

<style scoped></style>
