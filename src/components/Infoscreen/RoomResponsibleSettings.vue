<template>
  <div>
    <CardComponent label="Confirm" header="Responsibles">
      <div class="flex flex-column">
        <span class="font-bold my-2">First Responsible</span>
        <Dropdown
          v-model="selectedFirstReponsible"
          :options="roomResponsibles"
          optionLabel="label"
          optionGroupLabel="label"
          optionGroupChildren="items"
          placeholder="Select User"
          :filter="true"
          filterMatchMode="contains"
        >
          <template #optiongroup="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.label }}</div>
            </div>
          </template>
        </Dropdown>
        <span v-if="selectedFirstReponsible" class="font-bold my-2">Second Responsible</span>
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
            <div class="flex align-items-center">
              <div>{{ slotProps.option.label }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// import { FilterMatchMode } from 'primevue/api';
import CardComponent from '@/layout/CardComponent.vue';
import Dropdown from 'primevue/dropdown';

const roomResponsibles = ref([
  {
    label: 'Board',
    code: 'BOARD',
    items: [
      { label: 'Gijs de Man', value: 'GijsdeMan' },
      { label: 'Samuel Oosterholt', value: 'SamuelOosterholt' },
      { label: 'Roy Kakkenberg', value: 'RoyKakkenberg' }
    ]
  },
  {
    label: 'Old board',
    code: 'OLDBOARD',
    items: [
      { label: 'Gijs de Man', value: 'GijsdeMan' },
      { label: 'Samuel Oosterholt', value: 'SamuelOosterholt' },
      { label: 'Roy Kakkenberg', value: 'RoyKakkenberg' }
    ]
  }
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
@import '@/styles/BasePage.scss';
</style>
