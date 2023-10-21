<template>
  <div>
    <CardComponent :header="$t('infoscreen.responsibles')">
      <div class="d-flex flex-column">
        <span class="fw-bold my-2">{{$t("infoscreen.firstResponsible")}}</span>
        <Dropdown
            v-model="selectedFirstReponsible"
            :options="roomResponsibles"
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            :placeholder="$t('infoscreen.selectUser')"
            :filter="true"
            filterMatchMode="contains"
        >
          <template #optiongroup="slotProps">
            <div class="d-flex align-items-center">
              <div>{{ slotProps.option.label }}</div>
            </div>
          </template>
        </Dropdown>
        <span v-if="selectedFirstReponsible" class="fw-bold my-2">{{$t("infoscreen.secondResponsible")}}</span>
        <Dropdown
            v-model="selectedSecondReponsible"
            :options="roomResponsibles"
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            placeholder="Select a User"
            :filter="true"
            filterMatchMode="contains"
            v-if="selectedFirstReponsible"
        >
          <template #optiongroup="slotProps">
            <div class="d-flex align-items-center">
              <div>{{ slotProps.option.label }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Client } from '@/api/Client';

import { FilterMatchMode } from 'primevue/api';
import CardComponent from "@/layout/CardComponent.vue";
import Dropdown from 'primevue/dropdown';

const roomResponsibles = ref([
  {
    label: 'Board',
    code: 'BOARD',
    items: [
      { label: 'Gijs de Man', value: 'GijsdeMan' },
      { label: 'Samuel Oosterholt', value: "SamuelOosterholt" },
      { label: 'Roy Kakkenberg', value: "RoyKakkenberg" }
    ]
  },
  {
    label: 'Old board',
    code: 'OLDBOARD',
    items: [
      { label: 'Gijs de Man', value: 'GijsdeMan' },
      { label: 'Samuel Oosterholt', value: "SamuelOosterholt" },
      { label: 'Roy Kakkenberg', value: "RoyKakkenberg" }
    ]
  },
]);

// roomResponsibles.value.unshift(
//   {
//     name: 'Nobody',
//     code: 'Nobody'
//   }
// )

const selectedFirstReponsible = ref();
const selectedSecondReponsible = ref();

onMounted(() => {
  // const client = new Client()
  // client.getUsers().then((data) => {
  //   roomResponsibles.value = data.users;
  // })
});

</script>

<style scoped>
@import '@/styles/BasePage.css';
</style>
