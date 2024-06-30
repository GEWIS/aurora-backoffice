<template>
  <div>
    <div class="mb-2">
      <div>
        <span class="block text-500 font-medium"
          >{{ subscriber.name }}
          <i :title="connectedText" :class="['pi text-sm ml-2', connectedIcon]"></i>
        </span>
      </div>
    </div>
    <SubscriberHandlerChangeDropdown
      :current-handler="currentHandler"
      :possible-handlers="possibleHandlers"
      :loading="loading"
      @change="(newHandler: string | null) => $emit('change', newHandler)"
    />
  </div>
</template>

<script setup lang="ts">
import SubscriberHandlerChangeDropdown from '@/components/handlers/SubscriberHandlerChangeDropdown.vue';
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
