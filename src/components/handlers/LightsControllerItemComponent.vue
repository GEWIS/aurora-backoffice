<template>
  <div>
    <div class="mb-2">
      <span class="block text-500 font-medium"
        >{{ controller.name }}
        <i :title="connectedText" :class="['pi text-sm ml-2', connectedIcon]"></i>
      </span>
    </div>
  </div>
  <div class="flex justify-content-between flex-wrap">
    <div v-for="group in lightsGroups" :key="group.id" class="my-3">
      <div class="mb-2">
        <span class="block text-500 font-medium">
          {{ group.name }}
        </span>
      </div>
      <SubscriberHandlerChangeDropdown
        :current-handler="
          handlersStore.lightsHandlers.find((h) => !!h.entities.find((e) => e.id === group.id))
        "
        :possible-handlers="handlersStore.lightsHandlers"
        @change="
          (newHandler: string | null) => handlersStore.setLightsHandler(group.id, newHandler)
        "
        :loading="handlersStore.loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberHandlerChangeDropdown from '@/components/handlers/SubscriberHandlerChangeDropdown.vue';
import { computed, type ComputedRef } from 'vue';
import type { LightsControllerResponse } from '@/api';

const props = defineProps<{
  controller: LightsControllerResponse;
}>();

const subscriberStore = storeToRefs(useSubscriberStore());
const lightsGroups = subscriberStore.lightsGroups.value.filter(
  (g) => g.controller.id === props.controller.id
);
const handlersStore = useHandlersStore();

const connected: ComputedRef<boolean> = computed(() => {
  const socketIds = props.controller.socketIds as any | undefined;
  return socketIds != null && Object.keys(socketIds).some((key) => socketIds[key] != null);
});

const connectedText = computed(() => {
  return connected.value ? 'connected' : 'disconnected';
});

const connectedIcon = computed(() => {
  return {
    'pi-sort-alt': connected.value,
    'text-green-300': connected.value,
    'pi-sort-alt-slash': !connected.value,
    'text-400': !connected.value
  };
});
</script>

<style lang="scss"></style>
