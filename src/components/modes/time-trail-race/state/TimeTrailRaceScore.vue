<template>
  <div v-if="store.currentPlayer != null">
    <h3>{{ store.currentPlayer?.name }}'s final score</h3>
    <table>
      <tbody>
        <tr>
          <td class="font-bold mr-1 text-right">Time:</td>
          <td>{{ toStopwatchString(store.currentPlayer?.timeMs) }}</td>
        </tr>
        <tr>
          <td class="font-bold mr-1 text-right">Position:</td>
          <td>{{ position }} / {{ store.scoreboard.length }}</td>
        </tr>
      </tbody>
    </table>
    <Button :loading="store.loading" @click="store.revealScore()">
      Reveal scores on screen & play again
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import { toStopwatchString } from '@/utils/timeUtils';
import { computed } from 'vue';

const store = useTimeTrailRaceStore();

const position = computed(() => {
  return (store.scoreboard.findIndex((s) => s.uuid === store.currentPlayer?.uuid) ?? -2) + 1;
});
</script>

<style scoped></style>
