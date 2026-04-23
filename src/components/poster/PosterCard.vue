<template>
  <AppBox class="h-full">
    <div class="relative">
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
      <PosterStatusIndicator class="absolute top-2 right-2 z-10 ring-2 ring-black/30" :poster="poster" />
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
    <div class="flex flex-row gap-2 mt-3">
      <PosterButtonDelete :poster="poster" />
      <Button class="flex-1" icon="pi pi-pencil" severity="secondary" />
      <StaticPosterButtonShow :disabled="poster.type === PosterType.PHOTO" :poster="poster" />
    </div>
  </AppBox>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type LocalPosterResponse, PosterType } from '@/api';
import AppBox from '@/layout/AppBox.vue';
import PosterButtonDelete from '@/components/poster/PosterButtonDelete.vue';
import PosterStatusIndicator from '@/components/poster/PosterStatusIndicator.vue';
import StaticPosterButtonShow from '@/components/poster/StaticPosterButtonShow.vue';

const props = defineProps<{
  poster: LocalPosterResponse;
}>();

const mediaUrl = computed(() => props.poster.file?.location ?? props.poster.uri ?? '');

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
</script>

<style scoped></style>
