<template>
  <Card class="bg-transparent">
    <template #content>
      <h6 class="mb-4">
        {{ controller.name }}
        <i :title="connectedText" :class="['pi text-sm ml-2', connectedIcon]"></i>
      </h6>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 xxl:grid-cols-3 gap-5"
      >
        <div v-for="group in lightsGroups" :key="group.id">
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
            :loading="handlersStore.gettingLights || handlersStore.settingLights"
            :disabled="!authStore.isInSecurityGroup('handler', 'privileged')"
            @change="
              (newHandler: string | null) => handlersStore.setLightsHandler(group.id, newHandler)
            "
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberHandlerChangeSelect from '@/components/handlers/SubscriberHandlerChangeSelect.vue';
import { computed, type ComputedRef } from 'vue';
import type { LightsControllerResponse } from '@/api';
import { useAuthStore } from '@/stores/auth.store';

const props = defineProps<{
  controller: LightsControllerResponse;
}>();

const subscriberStore = storeToRefs(useSubscriberStore());
const lightsGroups = subscriberStore.lightsGroups.value.filter(
  (g) => g.controller.id === props.controller.id
);
const handlersStore = useHandlersStore();
const authStore = useAuthStore();

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
