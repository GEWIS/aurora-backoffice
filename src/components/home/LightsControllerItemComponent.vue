<template>
  <span class="font-bold">{{ controller.name }}</span>
  <span v-if="!!controller.socketId" class="text-sm">Connected</span>
  <span v-if="!controller.socketId" class="font-italic text-sm opacity-30">Disconnected</span>
  <div class="mt-2">
    <div v-for="group in lightsGroups" :key="group.id" class="mt-2">
      <div class="flex flex-column">
        <span class="font-bold text-sm">{{ group.name }}</span>
        <SubscriberHandlerChangeDropdown
          :current-handler="handlersStore.lightsHandlers.find((h) => !!h.entities.find((e) => e.id === group.id))"
          :possible-handlers="handlersStore.lightsHandlers"
          @change="(newHandler: string | null) => handlersStore.setLightsHandler(group.id, newHandler)"
          :loading="handlersStore.loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LightsControllerResponse } from '@/api/Client';
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberHandlerChangeDropdown from '@/components/home/SubscriberHandlerChangeDropdown.vue';

const props = defineProps<{
  controller: LightsControllerResponse;
}>();

const subscriberStore = storeToRefs(useSubscriberStore());
const lightsGroups = subscriberStore
  .lightsGroups.value.filter((g) => g.controller.id === props.controller.id);
const handlersStore = useHandlersStore();

</script>

<style lang="scss">

</style>
