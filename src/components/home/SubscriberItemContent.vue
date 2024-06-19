<template>
  <span class="font-bold">{{ subscriber.name }}</span>
  <span v-if="connected" class="text-sm">Connected</span>
  <span v-if="!connected" class="font-italic text-sm opacity-30">Disconnected</span>
  <subscriber-handler-change-dropdown
    :current-handler="currentHandler"
    :possible-handlers="possibleHandlers"
    :loading="loading"
    @change="(newHandler: string | null) => $emit('change', newHandler)"
  />
</template>

<script setup lang="ts">
import SubscriberHandlerChangeDropdown from '@/components/home/SubscriberHandlerChangeDropdown.vue';
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
</script>

<style lang="scss"></style>
