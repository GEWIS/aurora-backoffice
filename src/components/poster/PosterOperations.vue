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
      label="Force reload from source"
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
    <PosterBorrelModeSwitch />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePosterStore } from '@/stores/poster-store';
import PosterBorrelModeSwitch from '@/components/poster/PosterBorrelModeSwitch.vue';

const store = usePosterStore();

const refreshLoading = ref(false);
const updateLoading = ref(false);
</script>

<style scoped></style>
