<template>
  <tr>
    <td class="text-center">
      <div class="my-2" :style="{ color: connected ? 'green' : 'darkgray' }">
        <FontAwesomeIcon class="text-6xl mr-3 my-2" :icon="icon" />
      </div>
    </td>
    <td>
      <div class="flex flex-column mb-2">
        <slot />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { AudioResponse, LightsControllerResponse, ScreenResponse } from '@/api/Client';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { computed, type ComputedRef } from 'vue';

const props = defineProps<{
  subscriber: AudioResponse | ScreenResponse | LightsControllerResponse;
  icon: IconDefinition;
}>();

const connected: ComputedRef<boolean> = computed(
  () => {
    const socketIds = props.subscriber.socketIds as any | undefined;
    return socketIds != null && Object.keys(socketIds).some((key) => socketIds[key] != null);
  });
</script>

<style scoped lang="scss"></style>
