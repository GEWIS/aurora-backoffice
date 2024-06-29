<template>
  <Dropdown
    :model-value="currentHandler?.name"
    :options="possibleHandlers"
    option-label="name"
    option-value="name"
    placeholder="Select handler"
    class="overflow-hidden text-overflow-ellipsis w-13rem"
    @update:model-value="
      (newHandler: string | null) => {
        $emit('change', newHandler);
      }
    "
    show-clear
    :loading="loading"
  />
</template>

<script setup lang="ts">
import type { Handler } from '@/stores/handlers.store';

defineProps<{
  currentHandler?: Handler;
  possibleHandlers: Handler[];
  loading?: boolean;
}>();

defineEmits<{
  change: [handler: string | null];
}>();
</script>

<style scoped></style>
