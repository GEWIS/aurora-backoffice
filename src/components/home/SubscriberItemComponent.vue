<template>
  <div role="button" class="flex flex-row align-items-center my-3">
    <i
      class="pi pi-desktop text-4xl m-3"
      :style="{ color: subscriber.socketId ? 'green' : 'gray' }"
    />
    <div class="flex flex-column">
      <span class="font-bold">{{ subscriber.name }}</span>
      <span>Socket ID {{ subscriber.socketId }}</span>
      <span class="text-sm opacity-30">{{ subscriber.id }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AudioResponse, type ScreenResponse } from '@/api/Client';


defineProps<{
  subscriber: AudioResponse | ScreenResponse;
}>();
</script>

<style scoped lang="scss"></style>
