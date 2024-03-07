<template>
  <EffectSettingsDialog can-save effect-name="SingleFlood" @save="handleAddEffect">
    <SelectorRatioSlider
      id="dimMilliseconds"
      :min="0"
      :max="3000"
      name="Dim time (in ms)"
      :step="100"
      :value="dimMilliseconds"
      @update="(newVal: number) => (dimMilliseconds = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { SingleFloodCreateParams } from '@/api';

const store = useEffectsControllerStore();

const dimMilliseconds = ref<number>(500);

const handleAddEffect = () => {
  store.addColorEffect({
    type: SingleFloodCreateParams.type.SINGLE_FLOOD,
    props: {
      dimMilliseconds: dimMilliseconds.value
    }
  });
};
</script>

<style scoped></style>
