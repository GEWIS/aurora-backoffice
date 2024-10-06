<template>
  <EffectSettingsDialog can-save effect-name="ClassicRotate" @save="handleAddEffect">
    <SelectorRatioSlider
      :min="5000"
      :max="20000"
      :step="1000"
      :value="cycleTime"
      @update="(newVal: number) => (cycleTime = newVal)"
      id="cycleTime"
      name="Cycle time (in ms)"
    />
    <SelectorRatioSlider
      :min="0"
      :max="1"
      :step="0.05"
      :value="offsetFactor"
      @update="(newVal: number) => (offsetFactor = newVal)"
      id="offsetFactor"
      name="Offset factor"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const store = useEffectsControllerStore();

const cycleTime = ref<number>(10000);
const offsetFactor = ref<number>(0);

import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { MovementEffects_ClassicRotate } from '@/api';

const handleAddEffect = () => {
  store.setMovementEffect({
    type: MovementEffects_ClassicRotate.CLASSIC_ROTATE,
    props: {
      cycleTime: cycleTime.value,
      offsetFactor: offsetFactor.value
    }
  });
};
</script>

<style scoped></style>
