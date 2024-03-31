<template>
  <div class="flex flex-column gap-3">
    <div class="flex flex-column gap-2">
      <label for="time-trail-race-player-name">Player name</label>
      <InputText id="time-trail-race-player-name" v-model="playerName" />
    </div>
    <div class="flex align-items-center">
      <Checkbox v-model="isAlcoholFree" inputId="isAlcoholFree" name="isAlcoholFree" binary />
      <label for="isAlcoholFree" class="ml-2">Is alcohol free?</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox v-model="isBac" inputId="isBac" name="isBac" binary />
      <label for="isBac" class="ml-2">Is BAC?</label>
    </div>
    <div>
      <Button
        :loading="store.loading"
        :disabled="playerName.length === 0"
        @click="
          async () => {
            await store.registerPlayer({
              name: playerName,
              alcoholFree: isAlcoholFree,
              bac: isBac
            });
            playerName = '';
          }
        "
      >
        Register player
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';

const store = useTimeTrailRaceStore();

const playerName = ref('');
const isAlcoholFree = ref(false);
const isBac = ref(false);
</script>

<style scoped></style>
