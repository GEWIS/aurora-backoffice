<template>
  <EffectSettingsDialog can-save effect-name="SearchLight" @save="handleAddEffect">
    <SelectorRatioSlider
      id="radiusFactor"
      :max="2"
      :min="0"
      name="Radius factor"
      :step="0.1"
      :value="radiusFactor"
      @update="(newVal: number) => (radiusFactor = newVal)"
    />
    <SelectorRatioSlider
      id="cycleTime"
      :max="20000"
      :min="0"
      name="Cycle time (in ms)"
      :step="1000"
      :value="cycleTime"
      @update="(newVal: number) => (cycleTime = newVal)"
    />
    <SelectorRatioSlider
      id="offsetFactor"
      :max="1"
      :min="0"
      name="Offset factor"
      :step="0.05"
      :value="offsetFactor"
      @update="(newVal: number) => (offsetFactor = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { MovementEffects_SearchLight } from '@/api';

const store = useEffectsControllerStore();

const radiusFactor = ref<number>(1);
const cycleTime = ref<number>(4000);
const offsetFactor = ref<number>(0.25);

const handleAddEffect = () => {
  store.setMovementEffect({
    type: MovementEffects_SearchLight.SEARCH_LIGHT,
    props: {
      cycleTime: cycleTime.value,
      offsetFactor: offsetFactor.value,
      radiusFactor: radiusFactor.value,
    },
  });
};
</script>

<style scoped></style>
