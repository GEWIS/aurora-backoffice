<template>
  <div class="h-full flex flex-row align-items-center justify-content-center gap-1">
    Borrel mode
    <ToggleSwitch
      :disabled="store.loading"
      :model-value="store.borrelModeActive"
      @change="store.setBorrelMode(!store.borrelModeActive)"
    />
  </div>
</template>

<script setup lang="ts">
import { usePosterStore } from '@/stores/poster-store';

const store = usePosterStore();
</script>

<style scoped></style>
