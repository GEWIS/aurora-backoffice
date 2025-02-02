<template>
  <SelectorLightsColor v-if="showColors" @colors-updated="(c: RgbColor[]) => (colors = c)" />
  <SelectorRatioSlider
    id="sparkle-ratio"
    :max="1"
    :min="0"
    name="Turn-on ratio (every cycle)"
    :step="0.05"
    :value="ratio"
    @update="(newVal: number) => (ratio = newVal)"
  />
  <SelectorRatioSlider
    id="sparkle-dimDuration"
    :max="2000"
    :min="0"
    name="Turn-off time (in ms)"
    :step="25"
    :value="dimDuration"
    @update="(newVal: number) => (dimDuration = newVal)"
  />
  <SelectorRatioSlider
    id="sparkle-cycleTime"
    :max="2000"
    :min="0"
    name="Cycle time (in ms)"
    :step="25"
    :value="cycleTime"
    @update="(newVal: number) => (cycleTime = newVal)"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { ColorEffects_Sparkle, RgbColor, type SparkleCreateParams } from '@/api';

const props = defineProps<{
  showColors: boolean;
  modelValue?: SparkleCreateParams;
}>();

const emit = defineEmits<{
  'update:modelValue': [params: SparkleCreateParams];
}>();

const colors = ref<RgbColor[]>(props.modelValue?.props.colors || []);
const ratio = ref<number>(props.modelValue?.props.ratio || 0.2);
const dimDuration = ref<number>(props.modelValue?.props.dimDuration || 800);
const cycleTime = ref<number>(props.modelValue?.props.cycleTime || 200);

const handleChange = () => {
  const payload: SparkleCreateParams = {
    type: ColorEffects_Sparkle.SPARKLE,
    props: {
      colors: colors.value,
      ratio: ratio.value,
      dimDuration: dimDuration.value,
      cycleTime: cycleTime.value,
    },
  };
  emit('update:modelValue', payload);
};

watch([colors, ratio, dimDuration, cycleTime], handleChange);
onMounted(handleChange);
</script>

<style scoped></style>
