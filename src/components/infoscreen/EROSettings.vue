<template>
  <div>
    <div class="flex flex-column">
      <span class="font-bold my-2">First ERO</span>
      <Select
        v-model="selectedFirstERO"
        :options="EROs"
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        placeholder="Select a User"
        :filter="true"
        filterMatchMode="contains"
        :showClear="!selectedSecondERO"
        @change="changeFirstERO"
      >
        <template #optiongroup="slotProps">
          <div class="flex align-items-center">
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Select>
      <template v-if="selectedFirstERO">
        <span class="font-bold my-2">Second ERO</span>
        <Select
          v-model="selectedSecondERO"
          :options="EROs"
          optionLabel="label"
          optionGroupLabel="label"
          optionGroupChildren="items"
          placeholder="Select a User"
          :filter="true"
          filterMatchMode="contains"
          showClear
          @change="changeSecondERO"
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
import { useInfoscreenStore } from '@/stores/infoscreen.store';
import { storeToRefs } from 'pinia';
import type { Member } from '@/api';

enum RoomGroup {
  BOARD = 'Board',
  ERO = 'ERO'
}

const infoscreenStore = useInfoscreenStore();
const infoscreen = storeToRefs(useInfoscreenStore());

const EROs: Array<any> = [
  { label: RoomGroup.BOARD, code: RoomGroup.BOARD, items: [] },
  { label: RoomGroup.ERO, code: RoomGroup.ERO, items: [] }
];

const groups = [infoscreen.infoscreenBoard.value, infoscreen.infoscreenERO.value];
const responsibles: string[] = [];

const selectedFirstERO = ref();
const selectedSecondERO = ref();

for (let i = 0; i < groups.length; i += 1) {
  EROs[i].items = groups[i].reduce((result: Array<any>, current: Member) => {
    if (responsibles.indexOf(current.employeeNumber) === -1) {
      responsibles.push(current.employeeNumber);
      const entry: any = {
        label: current.displayName,
        value: current.employeeNumber
      };
      result.push(entry);
      if (current.employeeNumber === infoscreen.infoscreenSettings.value.firstERO) {
        selectedFirstERO.value = entry;
      } else if (current.employeeNumber === infoscreen.infoscreenSettings.value.secondERO)
        selectedSecondERO.value = entry;
    }
    return result;
  }, []);
}

const changeFirstERO = (e: SelectChangeEvent) => {
  infoscreen.infoscreenSettings.value.firstERO = e.value ? e.value.value : null;
  infoscreenStore.setInfo();
};

const changeSecondERO = (e: SelectChangeEvent) => {
  infoscreen.infoscreenSettings.value.secondERO = e.value ? e.value.value : null;
  infoscreenStore.setInfo();
};
</script>

<style scoped></style>
