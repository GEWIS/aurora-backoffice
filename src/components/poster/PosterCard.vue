<template>
  <Card
    :pt="{
      body: { class: 'p-3 m-0' },
      content: { class: 'p-0 m-0' }
    }"
    style="height: 100%"
  >
    <template #header v-if="poster.type === 'img'">
      <div class="full-width">
        <Carousel
          :value="poster.source"
          :num-visible="1"
          :num-scroll="1"
          v-if="poster.source.length > 1"
          circular
          container-class="relative"
          class="left"
          :prev-button-props="{ class: 'absolute left-0', style: { zIndex: 100 } }"
          :next-button-props="{ class: 'absolute right-0', style: { zIndex: 100 } }"
          :show-indicators="false"
          :autoplay-interval="3000"
        >
          <template #item="slotProps">
            <Image
              :src="slotProps.data"
              :alt="poster.name"
              class="full-width"
              image-class="full-width"
              preview
            />
          </template>
        </Carousel>
        <Image
          v-else
          :src="poster.source[0]"
          :alt="poster.name"
          class="full-width"
          image-class="full-width"
          preview
        />
      </div>
    </template>
    <template #header v-else>
      <div
        class="full-width flex justify-content-center align-items-center"
        style="aspect-ratio: 16/9; background-color: silver"
      >
        <a v-if="poster.type === 'extern'" :href="poster.source[0]" target="_blank">
          <Button outlined>
            {{ capitalize(poster.type) }}
          </Button>
        </a>
        <span v-else>
          {{ capitalize(poster.type) }}
        </span>
      </div>
    </template>
    <template #content>
      <div class="flex flex-column gap-1">
        <div>{{ poster.label }}</div>
        <div
          class="font-bold text-overflow-ellipsis white-space-nowrap overflow-hidden"
          :title="poster.name"
        >
          {{ poster.name }}
        </div>
        <div class="text-sm mt-2 font-italic opacity-50">
          <i class="pi pi-clock" />
          {{ poster.timeout }} seconds
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { type ErrorPoster, type LocalPoster, type MediaPoster, type PhotoPoster } from '@/api';

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

defineProps<{
  poster: LocalPoster | MediaPoster | PhotoPoster | ErrorPoster;
}>();
</script>

<style scoped></style>
