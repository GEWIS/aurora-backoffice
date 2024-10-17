<template>
  <div v-if="store.currentPlayer != null">
    <h3>{{ store.currentPlayer?.name }}'s final score</h3>
    <table>
      <tbody>
        <tr>
          <td class="font-bold mr-1 text-right">Time:</td>
          <td>
            {{ stopwatch }}
          </td>
        </tr>
        <tr>
          <td class="font-bold mr-1 text-right">Position:</td>
          <td>{{ position }} / {{ store.scoreboard.length }}</td>
        </tr>
      </tbody>
    </table>
    <Button class="w-full h-5rem" :loading="store.loading" @click="store.revealScore()">
      Reveal scores on screen & play again
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ScoreboardItem } from '../../../../api';
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import { toStopwatchString } from '@/utils/timeUtils';

const store = useTimeTrailRaceStore();

const position = computed(() => {
  return (store.scoreboard.findIndex((s) => s.uuid === store.currentPlayer?.uuid) ?? -2) + 1;
});

const stopwatch = computed(() => {
  if (!store.currentPlayer) return '';
  const time = (store.currentPlayer as ScoreboardItem).timeMs;
  if (!time) return '';
  return toStopwatchString(time);
});
</script>

<style scoped></style>
