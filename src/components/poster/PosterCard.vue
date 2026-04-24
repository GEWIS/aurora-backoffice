<template>
  <AppBox class="h-full flex flex-col gap-3">
    <div class="relative">
      <div v-if="poster.type === PosterType.IMG" class="w-full aspect-video rounded-lg overflow-hidden bg-surface-300">
        <Image
          :alt="poster.name"
          class="w-full h-full"
          image-class="w-full h-full object-cover"
          preview
          :src="mediaUrl"
        />
      </div>
      <div
        v-else-if="poster.type === PosterType.VIDEO"
        class="w-full aspect-video rounded-lg overflow-hidden bg-surface-300"
      >
        <video class="w-full h-full object-cover" controls muted>
          <source :src="mediaUrl" />
        </video>
      </div>
      <a
        v-else-if="poster.type === PosterType.EXTERN"
        class="w-full aspect-video rounded-lg overflow-hidden bg-surface-300 text-primary-contrast flex justify-center items-center hover:brightness-50 transition duration-200"
        :href="mediaUrl"
        target="_blank"
      >
        {{ capitalize(poster.type) }}
      </a>
      <div
        v-else-if="poster.type === PosterType.PHOTO"
        class="w-full aspect-video rounded-lg overflow-hidden bg-surface-300 text-primary-contrast flex flex-col justify-center items-center"
      >
        <i class="pi pi-images text-2xl" />
        <span>{{ poster.albums?.length ?? 0 }} album(s)</span>
      </div>
      <div
        v-else
        class="w-full aspect-video rounded-lg overflow-hidden bg-surface-300 text-primary-contrast flex justify-center items-center"
      >
        {{ capitalize(poster.type) }}
      </div>
      <PosterStatusIndicator class="absolute top-2 right-2 z-10 ring-2 ring-black/30" :poster="poster" />
    </div>

    <div class="flex flex-col gap-1 min-w-0">
      <div class="font-bold truncate" :title="poster.name">
        {{ poster.name }}
      </div>
      <div class="min-h-[1.25rem] text-sm truncate" :class="poster.label ? 'opacity-70' : 'opacity-40 italic'">
        {{ poster.label || '(no title)' }}
      </div>
      <div class="text-xs italic opacity-50">
        <i class="pi pi-clock" />
        {{ poster.defaultTimeout }} seconds
      </div>
    </div>

    <div class="mt-auto flex flex-row items-center gap-2">
      <PosterButtonDelete :poster="poster" />
      <PosterEdit :poster="poster" />
      <StaticPosterButtonShow :disabled="poster.type === PosterType.PHOTO" :poster="poster" />
    </div>
  </AppBox>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type LocalPosterResponse, PosterType } from '@/api';
import AppBox from '@/layout/AppBox.vue';
import PosterButtonDelete from '@/components/poster/PosterButtonDelete.vue';
import PosterEdit from '@/components/poster/PosterEdit.vue';
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

<style scoped>

:deep(.p-image > img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
