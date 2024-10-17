<template>
  <Select
    :model-value="currentHandler?.name"
    :options="possibleHandlers"
    option-label="name"
    option-value="name"
    placeholder="Select handler"
    class="overflow-hidden text-overflow-ellipsis w-full"
    show-clear
    :disabled="disabled"
    :loading="loading"
    @update:model-value="
      (newHandler: string | null) => {
        $emit('change', newHandler);
      }
    "
  />
</template>

<script setup lang="ts">
import type { Handler } from '@/stores/handlers.store';

defineProps<{
  currentHandler?: Handler;
  possibleHandlers: Handler[];
  disabled?: boolean;
  loading?: boolean;
}>();

defineEmits<{
  change: [handler: string | null];
}>();
</script>

<style scoped></style>
