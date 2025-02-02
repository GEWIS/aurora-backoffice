<template>
  <SelectorLightsColor v-if="showColors" v-model="colors" single-color />
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
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { ColorEffects_Wave, LightsEffectDirection, LightsEffectPattern, RgbColor, type WaveCreateParams } from '@/api';

const props = defineProps<{
  showColors: boolean;
  modelValue?: WaveCreateParams;
}>();

const emit = defineEmits<{
  'update:modelValue': [effect: WaveCreateParams];
}>();

const colors = ref<RgbColor[]>(props.modelValue?.props.colors || []);
const nrWaves = ref<number>(props.modelValue?.props.nrWaves || 1);
const cycleTime = ref<number>(props.modelValue?.props.cycleTime || 1000);
const pattern = ref<LightsEffectPattern>(props.modelValue?.props.pattern || LightsEffectPattern.HORIZONTAL);
const direction = ref<LightsEffectDirection>(props.modelValue?.props.direction || LightsEffectDirection.FORWARDS);

const handleChange = () => {
  const payload: WaveCreateParams = {
    type: ColorEffects_Wave.WAVE,
    props: {
      colors: colors.value,
      nrWaves: nrWaves.value,
      cycleTime: cycleTime.value,
      pattern: pattern.value,
      direction: direction.value,
    },
  };
  emit('update:modelValue', payload);
};

watch([colors, nrWaves, cycleTime, pattern, direction], handleChange);
onMounted(handleChange);
</script>

<style scoped></style>
