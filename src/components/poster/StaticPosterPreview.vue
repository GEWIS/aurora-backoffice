<template>
  <Image
    v-if="getPosterType(poster) === 'image'"
    :alt="poster.file?.name ?? getUrl(poster)"
    :class="previewClass"
    image-class="w-full rounded-lg"
    :src="getUrl(poster)"
    :title="poster.file?.name ?? getUrl(poster)"
  />
  <video v-else-if="getPosterType(poster) === 'video'" :class="previewClass" controls muted>
    <source :src="getUrl(poster)" />
  </video>
  <div v-else :class="previewClass">
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LocalPosterResponse } from '@/api';

const props = defineProps<{
  poster: LocalPosterResponse;
  class?: string | undefined;
}>();

const previewClass = computed(() => props.class);

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
