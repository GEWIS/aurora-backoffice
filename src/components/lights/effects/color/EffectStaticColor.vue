<template>
  <EffectSettingsDialog
    :can-save="colors.length === 1"
    effect-name="StaticColor"
    @save="handleAddEffect"
  >
    <SelectorLightsColor single-color @colorsUpdated="(c) => (colors = c)" />
    <SelectorBoolean
      id="beat-toggle"
      name="Beat Toggle"
      :checked="beatToggle"
      @click="beatToggle = !beatToggle"
    />
    <SelectorRatioSlider
      id="relative-brightness"
      :min="0"
      :max="1"
      name=""
      :step="0.05"
      :value="relativeBrightness"
      @update="(newVal) => (relativeBrightness = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { ref } from 'vue';
import { type RgbColor, StaticColorCreateParams, StaticColorCreateParamsType } from '@/api/Client';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorBoolean from '@/components/lights/effects/props/SelectorBoolean.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';

const store = useEffectsControllerStore();

const colors = ref<RgbColor[]>([]);
const beatToggle = ref<boolean>(false);
const relativeBrightness = ref<number>(1);

const handleAddEffect = () => {
  const createParams = new StaticColorCreateParams();
  createParams.type = StaticColorCreateParamsType.StaticColor;
  createParams.props.color = colors.value[0];
  createParams.props.beatToggle = beatToggle.value;
  createParams.props.relativeBrightness = relativeBrightness.value;

  store.addColorEffect(createParams);
};
</script>

<style scoped></style>
