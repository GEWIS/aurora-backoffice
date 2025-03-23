<template>
  <AppBox class="h-full">
    <div v-if="poster.type == PosterTypeImage.IMG">
      <div class="w-full">
        <Carousel
          v-if="poster.source.length > 1"
          :autoplay-interval="3000"
          circular
          class="left rounded-lg"
          container-class="relative"
          :next-button-props="{ class: 'absolute right-0', style: { zIndex: 100 } }"
          :num-scroll="1"
          :num-visible="1"
          :prev-button-props="{ class: 'absolute left-0', style: { zIndex: 100 } }"
          :show-indicators="false"
          :value="poster.source"
        >
          <template #item="slotProps">
            <Image :alt="poster.name" class="w-full" image-class="w-full rounded-lg" preview :src="slotProps.data" />
          </template>
        </Carousel>
        <Image
          v-else
          :alt="poster.name"
          class="w-full"
          image-class="w-full rounded-lg"
          preview
          :src="poster.source[0]"
        />
      </div>
    </div>
    <div v-else-if="poster.type === PosterTypeExternal.EXTERN">
      <a :href="poster.source[0]" target="_blank">
        <div
          class="hover:brightness-50 transition duration-200 w-full flex justify-center items-center rounded-lg aspect-video bg-surface-300 text-primary-contrast"
        >
          {{ capitalize(poster.type) }}
        </div>
      </a>
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
        {{ poster.timeout }} seconds
      </div>
    </div>
  </AppBox>
</template>

<script setup lang="ts">
import { type Poster, PosterTypeExternal, PosterTypeImage } from '@/api';
import AppBox from '@/layout/AppBox.vue';

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

defineProps<{
  poster: Poster;
}>();
</script>

<style scoped></style>
