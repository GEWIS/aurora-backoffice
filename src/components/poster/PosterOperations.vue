<template>
  <div class="flex flex-row gap-3">
    <Button
      label="Refresh"
      :loading="refreshLoading"
      @click="
        async () => {
          refreshLoading = true;
          await store.fetchPosters();
          refreshLoading = false;
        }
      "
    >
      <template #icon>
        <i class="pi pi-refresh mr-2" />
      </template>
    </Button>
    <div class="flex-1" />
    <PosterBorrelModeSwitch v-if="store.carousel.borrelModePresent" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PosterBorrelModeSwitch from '@/components/poster/PosterBorrelModeSwitch.vue';
import { usePosterStore } from '@/stores/poster/poster.store';

const store = usePosterStore();

const refreshLoading = ref(false);
</script>

<style scoped></style>
