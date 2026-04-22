<template>
  <div class="flex flex-row items-center justify-center gap-2">
    <label for="poster-borrel-mode-switch">Borrel mode</label>
    <ToggleSwitch
      id="poster-borrel-mode-switch"
      :disabled="store.loading"
      :model-value="store.carousel.borrelModeActive"
      @change="store.setBorrelMode!(!store.carousel.borrelModeActive)"
    />
  </div>
</template>

<script setup lang="ts">
import { usePosterStore } from '@/stores/poster/poster.store';

const store = usePosterStore();
</script>

<style scoped></style>
