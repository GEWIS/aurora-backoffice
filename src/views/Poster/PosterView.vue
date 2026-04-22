<template>
  <AppContainer icon="pi-image" title="Posters">
    <template #header>
      <PosterOperations />
    </template>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
      <!-- Posters -->
      <Card class="lg:col-span-3">
        <template #content>
          <!-- poster grid goes here -->
          <div v-if="posterStore.loading">
            <Spinner />
          </div>
          <div v-else class="grid gap-4 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-5">
            <div v-for="poster in posterStore.posters" :key="poster.name">
              <PosterCard :poster="poster" />
            </div>
          </div>
        </template>
      </Card>

      <!-- Settings sidebar -->
      <Card class="lg:col-span-1">
        <template #content>
          <div class="flex flex-col gap-5">
            <!-- settings controls -->
          </div>
        </template>
      </Card>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/layout/AppContainer.vue';
import { usePosterStore } from '@/stores/poster/poster.store';
import PosterCard from '@/components/poster/PosterCard.vue';
import PosterOperations from '@/components/poster/PosterOperations.vue';

const posterStore = usePosterStore();
void posterStore.init();
</script>

<style scoped></style>
