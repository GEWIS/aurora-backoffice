<template>
  <div class="page-container">
    <div class="page-title">Spoelbakkenrace Mode</div>
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-4">
        <TimeTrailRaceInitialize />
      </div>
      <div class="col-12 md:col-6 lg:col-8">
        <TimeTrailRaceStepper />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import { onUnmounted } from 'vue';
import TimeTrailRaceInitialize from '@/components/modes/time-trail-race/TimeTrailRaceInitialize.vue';
import TimeTrailRaceStepper from '@/components/modes/time-trail-race/TimeTrailRaceStepper.vue';

const store = useTimeTrailRaceStore();
store.init();

onUnmounted(() => {
  store.destroy();
});
</script>

<style scoped></style>
