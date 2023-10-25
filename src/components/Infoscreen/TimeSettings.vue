<template>
  <div>
    <CardComponent :header="$t('infoscreen.times')">
      <div class="flex flex-column">
        <span class="font-bold my-2">{{$t('infoscreen.roomOpen')}}</span>
        <Dropdown
            v-model="selectedRoomOpen"
            :options="roomOpenStatus"
            optionLabel="option"
            placeholder="Select an option"
        />
        <span class="font-bold my-2">{{$t('infoscreen.alcoholTime')}}</span>
        <Dropdown
            v-model="selectedAlcoholTime"
            :options="alcoholTime"
            optionLabel="time"
            placeholder="Select a time"
        />
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Client } from '@/api/Client';

import CardComponent from "@/layout/CardComponent.vue";
import Dropdown from 'primevue/dropdown';

const roomOpenStatus = ref([
  { option: 'Yes', code: 'YES' },
  { option: 'No', code: 'NO' },
]);
const selectedRoomOpen = ref(roomOpenStatus.value[0]);

const alcoholTime = ref([
  { time: '16:30', code: 'NORMAL' },
  { time: '14:00 (lecture free days)', code: 'EARLY' },
]);
const selectedAlcoholTime = ref(alcoholTime.value[0]);

onMounted(() => {
  // const client = new Client()
  // client.getTime().then((data) => {
  // })
});

</script>

<style scoped>
@import '@/styles/BasePage.css';
</style>
