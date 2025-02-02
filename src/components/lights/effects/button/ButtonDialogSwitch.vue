<template>
  <MultiSelect
    filter
    :model-value="switchIds"
    option-label="name"
    option-value="id"
    :options="store.lightsSwitches"
    placeholder="Select lights..."
    :title="
      store.lightsSwitches
        .filter((a) => switchIds.includes(a.id))
        .map((a) => a.name)
        .join(', ')
    "
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';

const store = useEffectsControllerStore();
const switchIds = ref<number[]>([]);
</script>

<style scoped></style>
