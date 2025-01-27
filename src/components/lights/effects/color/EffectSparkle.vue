<template>
  <EffectSettingsDialog :can-save="colors.length > 0" effect-name="Sparkle" @save="handleAddEffect">
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
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { RgbColor, type SparkleProps } from '@/api';

const props = defineProps<{
  showColors: boolean;
  effectProps?: Partial<SparkleProps>;
}>();

const emit = defineEmits<{
  save: [props: SparkleProps];
}>();

const colors = ref<RgbColor[]>(props.effectProps?.colors || []);
const ratio = ref<number>(props.effectProps?.ratio || 0.2);
const dimDuration = ref<number>(props.effectProps?.dimDuration || 800);
const cycleTime = ref<number>(props.effectProps?.cycleTime || 200);

const handleAddEffect = () => {
  const payload: SparkleProps = {
    colors: colors.value,
    ratio: ratio.value,
    dimDuration: dimDuration.value,
    cycleTime: cycleTime.value,
  };
  emit('save', payload);
};
</script>

<style scoped></style>
