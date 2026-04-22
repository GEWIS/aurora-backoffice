<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <!-- Posters -->
    <div class="lg:col-span-3 order-2 lg:order-1">
      <AppContainer icon="pi-image" title="Posters">
        <template #header>
          <PosterOperations />
        </template>
        <InputText v-model="search" class="w-full mb-4" placeholder="Search posters by name…" />
        <div v-if="posterStore.loading">
          <Spinner />
        </div>
        <div v-else-if="filteredPosters.length === 0" class="text-center italic opacity-70 py-8">
          No posters match “{{ search.trim() }}”
        </div>
        <div v-else class="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-5">
          <div v-for="poster in filteredPosters" :key="poster.name">
            <PosterCard :poster="poster" />
          </div>
        </div>
      </AppContainer>
    </div>

    <!-- Active static poster -->
    <div class="lg:col-span-1 order-1 lg:order-2">
      <AppContainer icon="pi-image" title="Active static poster">
        <div class="flex flex-col gap-2">
          <StaticPosterPreview v-if="activeStaticPoster" class="w-full" :poster="activeStaticPoster" />
          <div
            v-else
            class="w-full flex justify-center items-center rounded-lg aspect-video bg-surface-300 text-primary-contrast"
          >
            No active static poster
          </div>
          <div
            class="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden"
            :title="activeStaticPoster?.name ?? ''"
          >
            {{ activeStaticPoster?.name ?? '-' }}
          </div>
          <div class="flex flex-row gap-3 items-center">
            <StaticPosterButtonClear />
            <StaticPosterClockToggle />
          </div>
        </div>
      </AppContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppContainer from '@/layout/AppContainer.vue';
import { usePosterStore } from '@/stores/poster/poster.store';
import PosterCard from '@/components/poster/PosterCard.vue';
import PosterOperations from '@/components/poster/PosterOperations.vue';
import StaticPosterPreview from '@/components/poster/StaticPosterPreview.vue';
import StaticPosterButtonClear from '@/components/poster/StaticPosterButtonClear.vue';
import StaticPosterClockToggle from '@/components/poster/StaticPosterClockToggle.vue';

const posterStore = usePosterStore();
void posterStore.init();

const activeStaticPoster = computed(
  () => posterStore.staticPosters.find((p) => p.id === posterStore.static.activePosterId) ?? null,
);

const search = ref('');
const filteredPosters = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return posterStore.posters;
  return posterStore.posters.filter((p) => p.name.toLowerCase().includes(q));
});
</script>

<style scoped></style>
