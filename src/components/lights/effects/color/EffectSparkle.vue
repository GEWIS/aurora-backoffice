<template>
  <EffectSettingsDialog :can-save="colors.length > 0" effect-name="Sparkle" @save="handleAddEffect">
    <SelectorLightsColor @colorsUpdated="(c: RgbColor[]) => (colors = c)" />
    <SelectorRatioSlider
      id="sparkle-ratio"
      :min="0"
      :max="1"
      name="Turn-on ratio (every cycle)"
      :step="0.05"
      :value="ratio"
      @update="(newVal: number) => (ratio = newVal)"
    />
    <SelectorRatioSlider
      id="sparkle-dimDuration"
      :min="0"
      :max="2000"
      name="Turn-off time (in ms)"
      :step="25"
      :value="dimDuration"
      @update="(newVal: number) => (dimDuration = newVal)"
    />
    <SelectorRatioSlider
      id="sparkle-cycleTime"
      :min="0"
      :max="2000"
      name="Cycle time (in ms)"
      :step="25"
      :value="cycleTime"
      @update="(newVal: number) => (cycleTime = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { RgbColor, SparkleCreateParams } from '@/api';

const store = useEffectsControllerStore();

const colors = ref<RgbColor[]>([]);
const ratio = ref<number>(0.2);
const dimDuration = ref<number>(800);
const cycleTime = ref<number>(200);

const handleAddEffect = () => {
  store.addColorEffect({
    type: SparkleCreateParams.type.SPARKLE,
    props: {
      colors: colors.value,
      ratio: ratio.value,
      dimDuration: dimDuration.value,
      cycleTime: cycleTime.value
    }
  });
};
</script>

<style scoped></style>
