<template>
  <tr>
    <td class="text-center">
      <div class="my-2" :style="{ color: subscriber.socketId ? 'green' : 'darkgray' }">
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

defineProps<{
  subscriber: AudioResponse | ScreenResponse | LightsControllerResponse;
  icon: IconDefinition;
}>();


</script>

<style scoped lang="scss"></style>
