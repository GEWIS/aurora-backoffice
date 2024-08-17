<template>
  <div>
    <div class="flex flex-column">
      <span class="font-bold my-2">Room Status</span>
      <Select
        v-model="selectedRoomOpen"
        :options="roomStatus"
        optionLabel="option"
        placeholder="Select an option"
        @change="changeRoomStatus"
      />
      <template v-if="selectedRoomOpen && selectedRoomOpen.option === RoomStatus.OPEN">
        <span class="font-bold my-2">Alcohol Time</span>
        <Select
          v-model="selectedAlcoholTime"
          :options="alcoholTime"
          optionLabel="time"
          placeholder="Select a time"
          @change="changeAlcoholTime"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Select, { type SelectChangeEvent } from 'primevue/select';
import { AlcoholTime, RoomStatus } from '@/api';
import { storeToRefs } from 'pinia';
import { useInfoscreenStore } from '@/stores/infoscreen.store';

const infoscreenStore = useInfoscreenStore();
const infoscreen = storeToRefs(useInfoscreenStore());

const roomStatus = ref([
  { option: RoomStatus.OPEN, code: RoomStatus.OPEN },
  { option: RoomStatus.CLOSED, code: RoomStatus.CLOSED }
]);
const selectedRoomOpen = ref(
  roomStatus.value.find((i) => i.option === infoscreen.infoscreenSettings.value.roomStatus)
);
const changeRoomStatus = (e: SelectChangeEvent) => {
  infoscreen.infoscreenSettings.value.roomStatus = e.value.option;
  infoscreenStore.setInfo();
};

const alcoholTime = ref([
  { time: AlcoholTime._16_30, code: AlcoholTime._16_30 },
  { time: AlcoholTime._14_00, code: AlcoholTime._14_00 }
]);
const selectedAlcoholTime = ref(
  alcoholTime.value.find((i) => i.time === infoscreen.infoscreenSettings.value.alcoholTime)
);
const changeAlcoholTime = (e: SelectChangeEvent) => {
  infoscreen.infoscreenSettings.value.alcoholTime = e.value.time;
  infoscreenStore.setInfo();
};
</script>

<style scoped></style>
