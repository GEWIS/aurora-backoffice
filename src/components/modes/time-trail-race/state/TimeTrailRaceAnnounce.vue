<template>
  <Button class="w-full h-5rem" :loading="store.loading" @click="store.start()"> Start! </Button>
</template>

<script setup lang="ts">
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';

const store = useTimeTrailRaceStore();
</script>

<style scoped></style>
