<template>
  <EffectSettingsDialog :can-save="colors.length === 1" effect-name="Wave" @save="handleAddEffect">
    <SelectorLightsColor v-if="showColors" single-color @colors-updated="(c) => (colors = c)" />
    <SelectorRatioSlider
      id="waveSize"
      :max="1"
      :min="0"
      name="Wave size (ratio)"
      :step="0.05"
      :value="nrWaves"
      @update="(newVal: number) => (nrWaves = newVal)"
    />
    <SelectorRatioSlider
      id="waveCycleTime"
      :max="5000"
      :min="0"
      name="Cycle time (in ms)"
      :step="100"
      :value="cycleTime"
      @update="(newVal: number) => (cycleTime = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { LightsEffectDirection, LightsEffectPattern, RgbColor, type WaveProps } from '@/api';

const props = defineProps<{
  showColors: boolean;
  effectProps?: Partial<WaveProps>;
}>();

const emit = defineEmits<{
  save: [props: WaveProps];
}>();

const colors = ref<RgbColor[]>(props.effectProps?.colors || []);
const nrWaves = ref<number>(props.effectProps?.nrWaves || 1);
const cycleTime = ref<number>(props.effectProps?.cycleTime || 1000);
const pattern = ref<LightsEffectPattern>(props.effectProps?.pattern || LightsEffectPattern.HORIZONTAL);
const direction = ref<LightsEffectDirection>(props.effectProps?.direction || LightsEffectDirection.FORWARDS);

const handleAddEffect = () => {
  const payload: WaveProps = {
    colors: colors.value,
    nrWaves: nrWaves.value,
    cycleTime: cycleTime.value,
    pattern: pattern.value,
    direction: direction.value,
  };
  emit('save', payload);
};
</script>

<style scoped></style>
