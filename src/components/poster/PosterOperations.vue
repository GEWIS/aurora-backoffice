<template>
  <div class="flex flex-row gap-3">
    <Button
      label="Refresh"
      :loading="refreshLoading"
      @click="
        async () => {
          refreshLoading = true;
          await store.getPosters();
          refreshLoading = false;
        }
      "
    >
      <template #icon>
        <i class="pi pi-refresh mr-2" />
      </template>
    </Button>
    <Button
      label="Force reload"
      :loading="updateLoading"
      @click="
        async () => {
          updateLoading = true;
          await store.reloadPosters();
          updateLoading = false;
        }
      "
    >
      <template #icon>
        <i class="pi pi-download mr-2" />
      </template>
    </Button>
    <div class="flex-1" />
    <PosterBorrelModeSwitch v-if="store.borrelModePresent" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PosterBorrelModeSwitch from '@/components/poster/PosterBorrelModeSwitch.vue';
import { useCarouselPosterStore } from '@/stores/carousel-poster-store';

const store = useCarouselPosterStore();

const refreshLoading = ref(false);
const updateLoading = ref(false);
</script>

<style scoped></style>
