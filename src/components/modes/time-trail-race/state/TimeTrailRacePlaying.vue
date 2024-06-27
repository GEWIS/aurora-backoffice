<template>
  <div>
    <h2>{{ timeString }}</h2>
    <Button class="w-full h-5rem" :loading="store.loading" @click="store.finish()">
      Finish!
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { toStopwatchString } from '@/utils/timeUtils';

const now = ref(new Date());
const interval = ref<number>();
const store = useTimeTrailRaceStore();

const timeString = computed(() => {
  const totalDiffMs = store.startTime
    ? now.value.getTime() - store.startTime.getTime()
    : Number.NaN;
  return toStopwatchString(totalDiffMs);
});

const setTime = () => {
  now.value = new Date();
};

onMounted(() => {
  interval.value = setInterval(setTime, 20);
});
onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<style scoped></style>
