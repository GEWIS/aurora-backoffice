<template>
  <div>
    <div class="mb-2">
      <div class="flex max-w-full w-full overflow-hidden">
        <h6 class="mb-0 overflow-hidden white-space-nowrap text-overflow-ellipsis">
          {{ subscriber.name }}
          <i :class="['pi text-sm ml-2', connectedIcon]" :title="connectedText" />
        </h6>
      </div>
    </div>
    <SubscriberHandlerChangeSelect
      :current-handler="currentHandler"
      :disabled="disabled"
      :loading="loading"
      :possible-handlers="possibleHandlers"
      @change="(newHandler: string | null) => $emit('change', newHandler)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import SubscriberHandlerChangeSelect from '@/components/handlers/SubscriberHandlerChangeSelect.vue';
import type { Handler } from '@/stores/handlers.store';
import type {
  AudioResponse,
  LightsControllerResponse,
  PartialRecordSocketioNamespacesString,
  ScreenResponse,
} from '@/api';

const props = defineProps<{
  subscriber: AudioResponse | ScreenResponse | LightsControllerResponse;
  currentHandler: Handler | undefined;
  possibleHandlers: Handler[];
  loading?: boolean;
  disabled?: boolean;
}>();

defineEmits<{
  change: [handler: string | null];
}>();

const connected: ComputedRef<boolean> = computed(() => {
  const socketIds = props.subscriber.socketIds as PartialRecordSocketioNamespacesString;
  return socketIds && Object.keys(socketIds).some((key) => key in socketIds);
});

const connectedText = computed(() => {
  return connected.value ? 'connected' : 'disconnected';
});

const connectedIcon = computed(() => {
  return {
    'pi-sort-alt': connected.value,
    'text-green-300': connected.value,
    'pi-sort-alt-slash': !connected.value,
    'text-400': !connected.value,
  };
});
</script>

<style lang="scss"></style>
