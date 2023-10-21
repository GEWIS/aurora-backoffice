<template>
  <div role="button" class="d-flex flex-row align-items-center my-3" @click="setSelected">
    <i class="pi pi-desktop fs-2 me-3" :style="{'color': subscriber.active ? 'green' : 'gray'}" />
    <div class="d-flex flex-column">
      <span class="fw-bold">{{ subscriber.name }}</span>
      <span>Last seen {{ formatLastSeen(subscriber.lastSeen) }}</span>
      <span class="fs-6 opacity-25">{{ subscriber.id }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatLastSeen } from "@/utils/formatterUtils";
import {useSubscriberStore} from "@/stores/subscriber.store";

const subscriberStore = useSubscriberStore();


const props = defineProps<{
  subscriber: {
    active: boolean;
    name: string;
    lastSeen: Date;
    id: string;
  };
}>();

const setSelected = () => {
  subscriberStore.setSelected(props.subscriber.id);
}
</script>

<style scoped lang="scss">
@import "@/assets/main.css";
</style>