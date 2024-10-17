<template>
  <AppContainer icon="pi-hourglass" title="Spoelbakkenrace">
    <div class="grid grid-cols-1 lg:grid-cols-3">
      <TimeTrailRaceInitialize />
      <TimeTrailRaceStepper />
      <TimeTrailRaceScoreboard />
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import TimeTrailRaceInitialize from '@/components/modes/time-trail-race/TimeTrailRaceInitialize.vue';
import TimeTrailRaceStepper from '@/components/modes/time-trail-race/TimeTrailRaceStepper.vue';
import TimeTrailRaceScoreboard from '@/components/modes/time-trail-race/TimeTrailRaceScoreboard.vue';
import AppContainer from '@/layout/AppContainer.vue';

const store = useTimeTrailRaceStore();
store.init();

onUnmounted(() => {
  store.destroy();
});
</script>

<style scoped></style>
