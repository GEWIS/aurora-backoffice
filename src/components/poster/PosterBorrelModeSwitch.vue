<template>
  <div class="h-full flex flex-row align-items-center justify-content-center gap-1">
    Borrel mode
    <ToggleSwitch
      :disabled="store.isLoading"
      :model-value="store.isBorrelModeActive"
      @change="store.setBorrelMode!(!store.isBorrelModeActive)"
    />
  </div>
</template>

<script setup lang="ts">
import type BasePosterStore from '@/stores/poster/base-poster-store';

defineProps<{
  store: BasePosterStore;
}>();
</script>

<style scoped></style>
