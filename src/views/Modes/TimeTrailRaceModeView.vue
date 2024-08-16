<template>
  <AppContainer title="Spoelbakkenrace Mode" icon="pi-hourglass">
    <div class="grid">
      <div class="col-12 md:col-12 lg:col-4">
        <TimeTrailRaceInitialize />
      </div>
      <div class="col-12 md:col-6 lg:col-4">
        <TimeTrailRaceStepper />
      </div>
      <div class="col-12 md:col-6 lg:col-4">
        <TimeTrailRaceScoreboard />
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import { onUnmounted } from 'vue';
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
