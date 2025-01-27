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
import { type SearchLightProps } from '@/api';

const props = defineProps<{
  effectProps?: Partial<SearchLightProps>;
}>();

const emit = defineEmits<{
  save: [props: SearchLightProps];
}>();

const radiusFactor = ref<number>(props.effectProps?.radiusFactor || 1);
const cycleTime = ref<number>(props.effectProps?.cycleTime || 4000);
const offsetFactor = ref<number>(props.effectProps?.offsetFactor || 0.25);

const handleAddEffect = () => {
  const payload: SearchLightProps = {
    cycleTime: cycleTime.value,
    offsetFactor: offsetFactor.value,
    radiusFactor: radiusFactor.value,
  };
  emit('save', payload);
};
</script>

<style scoped></style>
