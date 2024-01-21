<template>
  <Button
    @touchstart="enableStrobe()"
    @mousedown="enableStrobe()"
    @mouseup="disableStrobe()"
    @blur="disableStrobe()"
    @mouseleave="disableStrobe()"
    @touchend="disableStrobe()"
  >
    Strobe
  </Button>
</template>

<script setup lang="ts">
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { ref } from 'vue';

const enabled = ref<boolean>(false);

const enableStrobe = () => {
  enabled.value = true;
  store.enableStrobe();
};

const disableStrobe = () => {
  if (!enabled.value) return;
  store.disableStrobe();
  enabled.value = false;
};

const store = useEffectsControllerStore();
</script>

<style scoped></style>
