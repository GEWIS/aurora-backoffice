<template>
  <div class="page-container">
    <div class="page-title">Loaded posters</div>
    <div class="flex flex-column full-width gap-4">
      <PosterOperations />
      <div class="grid">
        <div v-for="poster in store.posters" :key="poster.name" class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2">
          <PosterCard :poster="poster" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePosterStore } from '@/stores/poster-store';
import PosterOperations from '@/components/poster/PosterOperations.vue';
import PosterCard from '@/components/poster/PosterCard.vue';

const store = usePosterStore();
store.init();
</script>

<style scoped>

</style>
