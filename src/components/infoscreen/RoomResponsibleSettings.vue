<template>
  <div v-if="infoscreen.infoscreenSettings.value.roomStatus !== RoomStatus.CLOSED">
    <div class="flex flex-column">
      <span class="font-bold my-2">First Responsible</span>
      <Select
        v-model="selectedFirstResponsible"
        :options="roomResponsibles"
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        placeholder="Select User"
        :filter="true"
        filterMatchMode="contains"
        @change="changeFirstResponsible"
      >
        <template #optiongroup="slotProps">
          <div class="flex align-items-center">
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Select>
      <template v-if="selectedFirstResponsible.value != null">
        <span class="font-bold my-2">Second Responsible</span>
        <Select
          v-model="selectedSecondResponsible"
          :options="roomResponsibles"
          optionLabel="label"
          optionGroupLabel="label"
          optionGroupChildren="items"
          placeholder="Select a User"
          :filter="true"
          filterMatchMode="contains"
          v-if="selectedFirstResponsible"
          showClear
          @change="changeSecondResponsible"
        >
          <template #optiongroup="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.label }}</div>
            </div>
          </template>
        </Select>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Select, { type SelectChangeEvent } from 'primevue/select';

import { storeToRefs } from 'pinia';
import { useInfoscreenStore } from '@/stores/infoscreen.store';
import { type Member, RoomStatus } from '@/api';

enum RoomGroup {
  BOARD = 'Board',
  ERO = 'ERO',
  OTHER = 'Other',
  KEYHOLDER = 'Key holder',
  BAC = 'BAC'
}

const infoscreenStore = useInfoscreenStore();
const infoscreen = storeToRefs(useInfoscreenStore());

const roomResponsibles: Array<any> = [
  { label: RoomGroup.BOARD, code: RoomGroup.BOARD, items: [] },
  { label: RoomGroup.KEYHOLDER, code: RoomGroup.KEYHOLDER, items: [] },
  {
    label: RoomGroup.OTHER,
    code: RoomGroup.OTHER,
    items: [
      { label: RoomGroup.BOARD, value: RoomGroup.BOARD },
      { label: RoomGroup.BAC, value: RoomGroup.BAC }
    ]
  }
];

const groups = [infoscreen.infoscreenBoard.value, infoscreen.infoscreenResponsibles.value];
const responsibles: string[] = [];

const selectedFirstResponsible = ref();
const selectedSecondResponsible = ref();

for (let i = 0; i < groups.length; i += 1) {
  roomResponsibles[i].items = groups[i].reduce((result: Array<any>, current: Member) => {
    if (responsibles.indexOf(current.employeeNumber) === -1) {
      responsibles.push(current.employeeNumber);
      const entry: any = {
        label: current.displayName,
        value: current.employeeNumber
      };
      result.push(entry);
      if (current.employeeNumber === infoscreen.infoscreenSettings.value.firstResponsible) {
        selectedFirstResponsible.value = entry;
      } else if (current.employeeNumber === infoscreen.infoscreenSettings.value.secondResponsible)
        selectedSecondResponsible.value = entry;
    }
    return result;
  }, []);
}

const changeFirstResponsible = (e: SelectChangeEvent) => {
  infoscreen.infoscreenSettings.value.firstResponsible = e.value.value;
  console.log(selectedFirstResponsible);
  infoscreenStore.setInfo();
};

const changeSecondResponsible = (e: SelectChangeEvent) => {
  infoscreen.infoscreenSettings.value.secondResponsible = e.value ? e.value.value : null;
  infoscreenStore.setInfo();
};
</script>

<style scoped></style>
