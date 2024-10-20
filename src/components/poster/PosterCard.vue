<template>
  <Card
    :pt="{
      body: { class: 'p-3 m-0' },
      content: { class: 'p-0 m-0' }
    }"
    style="height: 100%"
  >
    <template v-if="poster.type == PosterType_IMAGE.IMG" #header>
      <div class="full-width">
        <Carousel
          v-if="poster.source.length > 1"
          :autoplay-interval="3000"
          circular
          class="left"
          container-class="relative"
          :next-button-props="{ class: 'absolute right-0', style: { zIndex: 100 } }"
          :num-scroll="1"
          :num-visible="1"
          :prev-button-props="{ class: 'absolute left-0', style: { zIndex: 100 } }"
          :show-indicators="false"
          :value="poster.source"
        >
          <template #item="slotProps">
            <Image
              :alt="poster.name"
              class="full-width"
              image-class="full-width"
              preview
              :src="slotProps.data"
            />
          </template>
        </Carousel>
        <Image
          v-else
          :alt="poster.name"
          class="full-width"
          image-class="full-width"
          preview
          :src="poster.source[0]"
        />
      </div>
    </template>
    <template v-else #header>
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
import { type Poster, PosterType_IMAGE } from '@/api';

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

defineProps<{
  poster: Poster;
}>();
</script>

<style scoped></style>
