<template>
  <Panel :header="`Play - ${store.sessionName}`">
    <template #default v-if="store.sessionName != null && store.state != null">
      <Stepper orientation="vertical" :active-step="currentStep" linear>
        <StepperPanel header="Register player">
          <template #content>
            <div class="p-3 w-full">
              <TimeTrailRaceRegisterPlayer />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel header="Preparation">
          <template #content>
            <div class="p-3 w-full">
              <TimeTrailRaceReady />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel header="Announce">
          <template #content>
            <div class="p-3 w-full">
              <TimeTrailRaceAnnounce />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel header="Playing">
          <template #content>
            <div class="p-3 w-full">
              <TimeTrailRacePlaying />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel header="Final score">
          <template #content>
            <div class="p-3 w-full">
              <TimeTrailRaceScore />
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </template>
    <template #default v-else>
      <div>
        <p class="font-italic">The Spoelbakkenrace has not been initialized.</p>
      </div>
    </template>
  </Panel>
</template>

<script setup>
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import { TimeTrailRaceState } from '@/api';
import { computed } from 'vue';
import TimeTrailRaceRegisterPlayer from '@/components/modes/time-trail-race/state/TimeTrailRaceRegisterPlayer.vue';
import TimeTrailRaceReady from '@/components/modes/time-trail-race/state/TimeTrailRacePreparation.vue';
import TimeTrailRaceAnnounce from '@/components/modes/time-trail-race/state/TimeTrailRaceAnnounce.vue';
import TimeTrailRacePlaying from '@/components/modes/time-trail-race/state/TimeTrailRacePlaying.vue';
import TimeTrailRaceScore from '@/components/modes/time-trail-race/state/TimeTrailRaceScore.vue';

const store = useTimeTrailRaceStore();
const currentStep = computed(() => {
  switch (store.state) {
    case undefined:
    case TimeTrailRaceState.INITIALIZED:
    case TimeTrailRaceState.SCOREBOARD:
      return 0;
    case TimeTrailRaceState.PLAYER_REGISTERED:
      return 1;
    case TimeTrailRaceState.PLAYER_READY:
      return 2;
    case TimeTrailRaceState.STARTED:
      return 3;
    case TimeTrailRaceState.FINISHED:
      return 4;
    default:
      return 0;
  }
});
</script>

<style scoped></style>
