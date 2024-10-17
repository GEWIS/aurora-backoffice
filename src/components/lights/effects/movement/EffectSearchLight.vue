<template>
  <EffectSettingsDialog can-save effect-name="SearchLight" @save="handleAddEffect">
    <SelectorRatioSlider
      id="radiusFactor"
      :min="0"
      :max="2"
      :step="0.1"
      :value="radiusFactor"
      name="Radius factor"
      @update="(newVal: number) => (radiusFactor = newVal)"
    />
    <SelectorRatioSlider
      id="cycleTime"
      :min="0"
      :max="20000"
      :step="1000"
      :value="cycleTime"
      name="Cycle time (in ms)"
      @update="(newVal: number) => (cycleTime = newVal)"
    />
    <SelectorRatioSlider
      id="offsetFactor"
      :min="0"
      :max="1"
      :step="0.05"
      :value="offsetFactor"
      name="Offset factor"
      @update="(newVal: number) => (offsetFactor = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const store = useEffectsControllerStore();

const radiusFactor = ref<number>(1);
const cycleTime = ref<number>(4000);
const offsetFactor = ref<number>(0.25);

import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { MovementEffects_SearchLight } from '@/api';

const handleAddEffect = () => {
  store.setMovementEffect({
    type: MovementEffects_SearchLight.SEARCH_LIGHT,
    props: {
      cycleTime: cycleTime.value,
      offsetFactor: offsetFactor.value,
      radiusFactor: radiusFactor.value
    }
  });
};
</script>

<style scoped></style>
