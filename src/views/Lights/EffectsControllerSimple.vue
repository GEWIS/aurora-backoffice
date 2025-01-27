<template>
  <AppContainer icon="pi-sparkles" title="Effects controller">
    <template #header>
      <BeatVisualizer />
    </template>

    <div class="grid grid-cols-1 md:grid-cols-8 gap-5">
      <Button v-for="button in buttons" :key="button" class="h-14" severity="secondary">Button {{ button + 1 }}</Button>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BeatVisualizer from '@/components/audio/BeatVisualizer.vue';
import AppContainer from '@/layout/AppContainer.vue';

const buttons = computed(() => {
  return new Array(64).fill(0).map((_, i) => i);
});
</script>

<style scoped></style>
