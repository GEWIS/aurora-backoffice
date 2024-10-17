<template>
  <div class="flex flex-column gap-2 w-full max-w-full">
    <MultiSelect
      class="w-full"
      :model-value="selectedAudios"
      :options="store.audios"
      filter
      option-label="name"
      option-value="id"
      placeholder="Select audio"
      :max-selected-labels="2"
      :title="
        store.audios
          .filter((a) => selectedAudios.includes(a.id))
          .map((a) => a.name)
          .join(', ')
      "
      @update:model-value="(value: number[]) => $emit('update:audios', value)"
    />
    <MultiSelect
      class="w-full"
      :model-value="selectedScreens"
      :options="store.screens"
      filter
      option-label="name"
      option-value="id"
      placeholder="Select screens"
      :max-selected-labels="2"
      :title="
        store.screens
          .filter((a) => selectedScreens.includes(a.id))
          .map((a) => a.name)
          .join(', ')
      "
      @update:model-value="(value: number[]) => $emit('update:screens', value)"
    />
    <MultiSelect
      class="w-full"
      :model-value="selectedLightGroups"
      :options="store.lightsGroups"
      filter
      option-label="name"
      option-value="id"
      placeholder="Select lights..."
      :max-selected-labels="2"
      :title="
        store.lightsGroups
          .filter((a) => selectedLightGroups.includes(a.id))
          .map((a) => a.name)
          .join(', ')
      "
      @update:model-value="(value: number[]) => $emit('update:light-groups', value)"
    />
  </div>
</template>

<script setup lang="ts">
import { useSubscriberStore } from '@/stores/subscriber.store';

defineProps<{
  selectedAudios: number[];
  selectedScreens: number[];
  selectedLightGroups: number[];
}>();

defineEmits<{
  'update:audios': [ids: number[]];
  'update:screens': [ids: number[]];
  'update:light-groups': [ids: number[]];
}>();

const store = useSubscriberStore();
</script>

<style scoped></style>
