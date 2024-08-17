<template>
  <div>
    <div class="mb-2">
      <div class="flex max-w-full w-full overflow-hidden">
        <h6 class="mb-0 overflow-hidden white-space-nowrap text-overflow-ellipsis">
          {{ subscriber.name }}
        </h6>
        <h6 class="m-0 white-space-nowrap">
          <i :title="connectedText" :class="['pi text-sm ml-3', connectedIcon]" />
        </h6>
      </div>
    </div>
    <SubscriberHandlerChangeSelect
      :current-handler="currentHandler"
      :possible-handlers="possibleHandlers"
      :loading="loading"
      @change="(newHandler: string | null) => $emit('change', newHandler)"
    />
  </div>
</template>

<script setup lang="ts">
import SubscriberHandlerChangeSelect from '@/components/handlers/SubscriberHandlerChangeSelect.vue';
import type { Handler } from '@/stores/handlers.store';
import { computed, type ComputedRef } from 'vue';
import type { AudioResponse, LightsControllerResponse, ScreenResponse } from '@/api';

const props = defineProps<{
  subscriber: AudioResponse | ScreenResponse | LightsControllerResponse;
  currentHandler: Handler | undefined;
  possibleHandlers: Handler[];
  loading?: boolean;
}>();

defineEmits<{
  change: [handler: string | null];
}>();

const connected: ComputedRef<boolean> = computed(() => {
  const socketIds = props.subscriber.socketIds as any | undefined;
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
