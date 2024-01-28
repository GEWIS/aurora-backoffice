<template>
  <EffectSettingsDialog
    :can-save="colors.length === 1"
    effect-name="Wave"
    @save="handleAddEffect"
  >
    <SelectorLightsColor single-color @colorsUpdated="(c) => colors = c" />
    <SelectorRatioSlider
      id="waveSize"
      :min="0"
      :max="1"
      name="Wave size (ratio)"
      :step="0.05"
      :value="size"
      @update="(newVal: number) => size = newVal"
    />
    <SelectorRatioSlider
      id="waveCycleTime"
      :min="0"
      :max="5000"
      name="Cycle time (in ms)"
      :step="100"
      :value="cycleTime"
      @update="(newVal: number) => cycleTime = newVal"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { RgbColor, WaveCreateParams, WaveCreateParamsType } from '@/api/Client';
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';

const store = useEffectsControllerStore();

const colors = ref<RgbColor[]>([]);
const size = ref<number>(1);
const cycleTime = ref<number>(1000);

const handleAddEffect = () => {
  const createParams = new WaveCreateParams();
  createParams.type = WaveCreateParamsType.Wave;
  createParams.props.color = colors.value[0];
  createParams.props.size = size.value;
  createParams.props.cycleTime = cycleTime.value;

  store.addColorEffect(createParams);
};
</script>

<style scoped>

</style>
