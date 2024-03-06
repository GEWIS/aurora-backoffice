<template>
  <div class="flex flex-row gap-1 align-items-center">
    <FontAwesomeIcon :icon="faBullhorn" />
    <div>[{{ formatDuration(horn.timestamp) }}]</div>
    <div class="font-bold">{{ horn.data.counter }}</div>
  </div>
</template>

<script setup lang="ts">
import { HornEvent } from '@/api/Client';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import { formatDuration } from '@/utils/formatterUtils';

defineProps<{
  horn: HornEvent;
}>();
</script>

<style scoped></style>
