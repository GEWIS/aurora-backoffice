<template>
  <div class="flex flex-column gap-2">
    <MultiSelect
      :model-value="selectedAudios"
      :options="store.audios"
      option-label="name"
      option-value="id"
      placeholder="Select audio players..."
      class="w-full"
      @update:modelValue="(value) => $emit('update:audios', value)"
      :title="
        store.audios
          .filter((a) => selectedAudios.includes(a.id))
          .map((a) => a.name)
          .join(', ')
      "
    />
    <MultiSelect
      :model-value="selectedScreens"
      :options="store.screens"
      option-label="name"
      option-value="id"
      placeholder="Select screens..."
      class="w-full"
      @update:modelValue="(value) => $emit('update:screens', value)"
      :title="
        store.screens
          .filter((a) => selectedScreens.includes(a.id))
          .map((a) => a.name)
          .join(', ')
      "
    />
    <MultiSelect
      :model-value="selectedLightGroups"
      :options="store.lightsGroups"
      option-label="name"
      option-value="id"
      placeholder="Select lights groups..."
      class="w-full"
      @update:modelValue="(value) => $emit('update:light-groups', value)"
      :title="
        store.lightsGroups
          .filter((a) => selectedLightGroups.includes(a.id))
          .map((a) => a.name)
          .join(', ')
      "
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
