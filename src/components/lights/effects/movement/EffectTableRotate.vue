<template>
  <EffectSettingsDialog can-save effect-name="TableRotate" @save="handleAddEffect">
    <SelectorRatioSlider
      :min="2000"
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
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { TableRotateCreateParams, TableRotateCreateParamsType } from '@/api/Client';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';

const store = useEffectsControllerStore();

const cycleTime = ref<number>(10000);
const offsetFactor = ref<number>(0.25);

const handleAddEffect = () => {
  const createParams = new TableRotateCreateParams();
  createParams.type = TableRotateCreateParamsType.TableRotate;
  createParams.props.cycleTime = cycleTime.value;
  createParams.props.offsetFactor = offsetFactor.value;

  store.addMovementEffect(createParams);
};
</script>

<style scoped></style>
