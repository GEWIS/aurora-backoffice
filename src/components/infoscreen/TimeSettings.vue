<template>
  <div>
    <div class="flex flex-column">
      <span class="font-bold my-2">Room Status</span>
      <Dropdown
        v-model="selectedRoomOpen"
        :options="roomStatus"
        optionLabel="option"
        placeholder="Select an option"
        @change="changeRoomStatus"
      />
      <template v-if="selectedRoomOpen && selectedRoomOpen.option === RoomStatus.OPEN">
        <span class="font-bold my-2">Alcohol Time</span>
        <Dropdown
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

import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown';
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
const changeRoomStatus = (e: DropdownChangeEvent) => {
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
const changeAlcoholTime = (e: DropdownChangeEvent) => {
  infoscreen.infoscreenSettings.value.alcoholTime = e.value.time;
  infoscreenStore.setInfo();
};
</script>

<style scoped></style>
