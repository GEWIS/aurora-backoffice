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
  <div v-else-if="getPosterType(poster) === 'external'" :class="previewClass">
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
  <div v-else :class="previewClass">
    <div
      class="w-full flex justify-center items-center rounded-lg aspect-video bg-surface-300 text-primary-contrast"
    >
      {{ capitalize(poster.type) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type LocalPosterResponse, PosterType } from '@/api';

const props = defineProps<{
  poster: LocalPosterResponse;
  class?: string | undefined;
}>();

const previewClass = computed(() => props.class);

const getUrl = (poster: LocalPosterResponse) => {
  return poster.file?.location ?? poster.uri ?? '';
};

const getPosterType = (
  poster: LocalPosterResponse,
): 'image' | 'video' | 'external' | 'placeholder' => {
  switch (poster.type) {
    case PosterType.IMG:
      return 'image';
    case PosterType.VIDEO:
      return 'video';
    case PosterType.EXTERN:
      return 'external';
    default:
      return 'placeholder';
  }
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
</script>

<style scoped></style>
