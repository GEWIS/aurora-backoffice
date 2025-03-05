<template>
  <AppContainer icon="pi-image" title="Static Posters">
    <template #header>
      <div class="flex flex-row gap-6 justify-center">
        <div class="flex flex-row gap-3 justify-center">
          <StaticPosterButtonClear />
          <StaticPosterUploadDialog />
        </div>
        <StaticPosterClockToggle />
      </div>
    </template>
    <template #default>
      <div v-if="store.loading">
        <Spinner />
      </div>
      <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <div v-for="poster in store.staticPosters" :key="poster.id">
          <div class="rounded-lg p-5 mt-3 border border-surface shadow-md bg-re">
            <div class="flex flex-col gap-4">
              <StaticPosterPreview class="w-full" :poster="poster" />
              <div class="flex flex-row gap-2">
                <StaticPosterButtonDelete :poster="poster" />
                <StaticPosterButtonShow :poster="poster" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/layout/AppContainer.vue';
import { useStaticPosterStore } from '@/stores/poster/static-poster.store';
import StaticPosterButtonDelete from '@/components/poster/StaticPosterButtonDelete.vue';
import StaticPosterButtonShow from '@/components/poster/StaticPosterButtonShow.vue';
import StaticPosterUploadDialog from '@/components/poster/StaticPosterUploadDialog.vue';
import StaticPosterClockToggle from '@/components/poster/StaticPosterClockToggle.vue';
import StaticPosterButtonClear from '@/components/poster/StaticPosterButtonClear.vue';
import StaticPosterPreview from '@/components/poster/StaticPosterPreview.vue';

const store = useStaticPosterStore();
store.init();
</script>

<style scoped></style>
