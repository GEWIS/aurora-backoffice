<template>
  <div role="button" class="flex flex-row align-items-center my-3" @click="setSelected">
    <i class="pi pi-desktop text-4xl m-3" :style="{'color': subscriber.active ? 'green' : 'gray'}" />
    <div class="flex flex-column">
      <span class="font-bold">{{ subscriber.name }}</span>
      <span>{{$t('subscriber.lastSeen')}} {{ formatLastSeen(subscriber.lastSeen) }}</span>
      <span class="text-sm opacity-30">{{ subscriber.id }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatLastSeen } from "@/utils/formatterUtils";
import { useSubscriberStore } from "@/stores/subscriber.store";

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
};
</script>

<style scoped lang="scss">
@import "@/assets/main.css";
</style>