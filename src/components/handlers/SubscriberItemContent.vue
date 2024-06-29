<template>
  <div>
    <div class="flex justify-content-around align-items-start mb-3">
      <div>
        <span class="block text-500 font-medium"
          >{{ subscriber.name }}
          <span v-if="!connected" class="font-italic text-sm opacity-30 ml-2">Disconnected</span>
        </span>
      </div>
    </div>
    <subscriber-handler-change-dropdown
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
</script>

<style lang="scss"></style>
