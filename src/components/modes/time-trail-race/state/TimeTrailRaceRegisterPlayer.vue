<template>
  <div class="flex flex-column gap-3">
    <div class="flex flex-column gap-2">
      <label for="time-trail-race-player-name">Player name</label>
      <InputText id="time-trail-race-player-name" v-model="playerName" class="w-full" />
    </div>
    <div class="flex align-items-center">
      <Checkbox v-model="isAlcoholFree" binary input-id="isAlcoholFree" name="isAlcoholFree" />
      <label class="ml-2" for="isAlcoholFree">Is alcohol free?</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox v-model="isBac" binary input-id="isBac" name="isBac" />
      <label class="ml-2" for="isBac">Is BAC?</label>
    </div>
    <div>
      <Button
        :disabled="playerName.length === 0"
        :loading="store.loading"
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
