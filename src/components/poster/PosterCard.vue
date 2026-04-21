<template>
  <AppBox class="h-full">
    <div v-if="poster.type === PosterType.IMG">
      <Image :alt="poster.name" class="w-full" image-class="w-full rounded-lg" preview :src="mediaUrl" />
    </div>
    <div v-else-if="poster.type === PosterType.VIDEO">
      <video class="w-full rounded-lg" controls muted>
        <source :src="mediaUrl" />
      </video>
    </div>
    <div v-else-if="poster.type === PosterType.EXTERN">
      <a :href="mediaUrl" target="_blank">
        <div
          class="hover:brightness-50 transition duration-200 w-full flex justify-center items-center rounded-lg aspect-video bg-surface-300 text-primary-contrast"
        >
          {{ capitalize(poster.type) }}
        </div>
      </a>
    </div>
    <div v-else-if="poster.type === PosterType.PHOTO">
      <div
        class="w-full flex flex-col justify-center items-center rounded-lg aspect-video bg-surface-300 text-primary-contrast"
      >
        <i class="pi pi-images text-2xl" />
        <span>{{ poster.albums?.length ?? 0 }} album(s)</span>
      </div>
    </div>
    <div v-else>
      <div class="w-full flex justify-center items-center rounded-lg aspect-video bg-surface-300 text-primary-contrast">
        {{ capitalize(poster.type) }}
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div>{{ poster.label }}</div>
      <div class="font-bold text-ellipsis whitespace-nowrap overflow-hidden" :title="poster.name">
        {{ poster.name }}
      </div>
      <div class="text-sm mt-2 italic opacity-50">
        <i class="pi pi-clock" />
        {{ poster.defaultTimeout }} seconds
      </div>
    </div>
  </AppBox>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type LocalPosterResponse, PosterType } from '@/api';
import AppBox from '@/layout/AppBox.vue';

const props = defineProps<{
  poster: LocalPosterResponse;
}>();

const mediaUrl = computed(() => props.poster.file?.location ?? props.poster.uri ?? '');

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
</script>

<style scoped></style>
