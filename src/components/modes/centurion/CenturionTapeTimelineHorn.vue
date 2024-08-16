<template>
  <div class="flex flex-row gap-1 align-items-center">
    <i class="pi pi-volume-up" />
    <div>[{{ formatDuration(horn.timestamp) }}]</div>
    <div class="font-bold">{{ horn.data.counter }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatDuration } from '@/utils/formatterUtils';
import type { HornEvent } from '@/api';

defineProps<{
  horn: HornEvent;
}>();
</script>

<style scoped></style>
