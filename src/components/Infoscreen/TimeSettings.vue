<template>
  <div>
    <CardComponent header="Times">
      <div class="flex flex-column">
        <span class="font-bold my-2">Room Status</span>
        <Dropdown
          v-model="selectedRoomOpen"
          :options="roomStatus"
          optionLabel="option"
          placeholder="Select an option"
          @change="changeRoomStatus"
        />
        <template v-if="selectedRoomOpen && selectedRoomOpen.option === RoomStatusEnum.OPEN">
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
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CardComponent from '@/layout/CardComponent.vue';
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown';
import { AlcoholTimeEnum, RoomStatusEnum } from '@/api';
import { storeToRefs } from 'pinia';
import { useInfoscreenStore } from '@/stores/infoscreen.store';

const infoscreenStore = useInfoscreenStore();
const infoscreen = storeToRefs(useInfoscreenStore());

const roomStatus = ref([
  { option: RoomStatusEnum.OPEN, code: RoomStatusEnum.OPEN },
  { option: RoomStatusEnum.CLOSED, code: RoomStatusEnum.CLOSED }
]);
const selectedRoomOpen = ref(
  roomStatus.value.find((i) => i.option === infoscreen.infoscreenSettings.value.roomStatus)
);
const changeRoomStatus = (e: DropdownChangeEvent) => {
  infoscreen.infoscreenSettings.value.roomStatus = e.value.option;
  infoscreenStore.setInfo();
};

const alcoholTime = ref([
  { time: AlcoholTimeEnum._16_30, code: AlcoholTimeEnum._16_30 },
  { time: AlcoholTimeEnum._14_00, code: AlcoholTimeEnum._14_00 }
]);
const selectedAlcoholTime = ref(
  alcoholTime.value.find((i) => i.time === infoscreen.infoscreenSettings.value.alcoholTime)
);
const changeAlcoholTime = (e: DropdownChangeEvent) => {
  infoscreen.infoscreenSettings.value.alcoholTime = e.value.time;
  infoscreenStore.setInfo();
};
</script>

<style scoped>
@import '@/styles/BasePage.scss';
</style>
