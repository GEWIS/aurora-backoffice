<template>
  <EffectSettingsDialog can-save effect-name="SearchLight" @save="handleAddEffect">
    <SelectorRatioSlider
      :min="0"
      :max="2"
      :step="0.1"
      :value="radiusFactor"
      @update="(newVal: number) => (radiusFactor = newVal)"
      id="radiusFactor"
      name="Radius factor"
    />
    <SelectorRatioSlider
      :min="0"
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

const radiusFactor = ref<number>(1);
const cycleTime = ref<number>(4000);
const offsetFactor = ref<number>(0.25);

import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { SearchLightCreateParams, SearchLightCreateParamsType } from '@/api/Client';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';

const handleAddEffect = () => {
  const createParams = new SearchLightCreateParams();
  createParams.type = SearchLightCreateParamsType.SearchLight;
  createParams.props.cycleTime = cycleTime;
  createParams.props.offsetFactor = offsetFactor;
  createParams.props.radiusFactor = radiusFactor;

  store.addEffect(createParams);
};
</script>

<style scoped></style>
