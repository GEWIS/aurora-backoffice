<template>
  <AppContainer icon="pi-image" title="Static Posters">
    <template #header>
      <StaticPosterUploadDialog />
    </template>
    <template #default>
      <div v-if="store.loading">
        <ProgressSpinner />
      </div>
      <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <div v-for="poster in store.staticPosters" :key="poster.id">
          <div class="rounded-lg p-5 mt-3 border border-surface shadow-md bg-re">
            <div class="flex flex-col gap-4">
              <Image
                v-if="getPosterType(poster) === 'image'"
                :alt="poster.file?.name ?? getUrl(poster)"
                class="w-full"
                image-class="w-full rounded-lg"
                :src="getUrl(poster)"
                :title="poster.file?.name ?? getUrl(poster)"
              />
              <video v-else-if="getPosterType(poster) === 'video'" class="w-full" controls muted>
                <source :src="getUrl(poster)" />
              </video>
              <div v-else class="w-full">
                <a :href="getUrl(poster)" target="_blank">
                  <div
                    class="hover:brightness-50 transition duration-200 w-full flex justify-center items-center rounded-lg aspect-video bg-surface-300 text-primary-contrast p-3"
                    :title="getUrl(poster)"
                  >
                    <span class="whitespace-nowrap text-ellipsis overflow-hidden">
                      {{ getUrl(poster) }}
                    </span>
                  </div>
                </a>
              </div>
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
import type { LocalPosterResponse } from '@/api';
import StaticPosterButtonDelete from '@/components/poster/StaticPosterButtonDelete.vue';
import StaticPosterButtonShow from '@/components/poster/StaticPosterButtonShow.vue';
import StaticPosterUploadDialog from '@/components/poster/StaticPosterUploadDialog.vue';

const store = useStaticPosterStore();
store.init();

const getUrl = (poster: LocalPosterResponse) => {
  return poster.file?.location ?? poster.uri ?? '';
};

const getPosterType = (poster: LocalPosterResponse): 'external' | 'image' | 'video' => {
  const url = getUrl(poster);

  if (url === '') return 'external';
  const extension = url.split('.').pop();
  if (!extension) return 'external';

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
  if (['mp4', 'avi', 'mkv'].includes(extension)) return 'video';
  return 'external';
};
</script>

<style scoped></style>
