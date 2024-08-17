<template>
  <div class="bg-transparent card">
    <h6 class="mb-4">
      {{ controller.name }}
      <i :title="connectedText" :class="['pi text-sm ml-2', connectedIcon]"></i>
    </h6>
    <div class="grid">
      <div
        v-for="group in lightsGroups"
        :key="group.id"
        class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-6 xxl:col-4"
      >
        <div class="mb-2">
          <h6 class="mb-0">
            {{ group.name }}
          </h6>
        </div>
        <SubscriberHandlerChangeSelect
          :current-handler="
            handlersStore.lightsHandlers.find((h) => !!h.entities.find((e) => e.id === group.id))
          "
          :possible-handlers="handlersStore.lightsHandlers"
          @change="
            (newHandler: string | null) => handlersStore.setLightsHandler(group.id, newHandler)
          "
          :loading="handlersStore.gettingLights || handlersStore.settingLights"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberHandlerChangeSelect from '@/components/handlers/SubscriberHandlerChangeSelect.vue';
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
