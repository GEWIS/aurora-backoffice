<template>
  <EffectSettingsDialog can-save effect-name="ClassicRotate" @save="handleAddEffect">
    <SelectorRatioSlider
      id="cycleTime"
      :max="20000"
      :min="5000"
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
import { type ClassicRotateProps } from '@/api';

const props = defineProps<{
  effectProps?: Partial<ClassicRotateProps>;
}>();

const emit = defineEmits<{
  save: [props: ClassicRotateProps];
}>();

const cycleTime = ref<number>(props.effectProps?.cycleTime || 10000);
const offsetFactor = ref<number>(props.effectProps?.offsetFactor || 0);

const handleAddEffect = () => {
  const payload: ClassicRotateProps = {
    cycleTime: cycleTime.value,
    offsetFactor: offsetFactor.value,
  };
  emit('save', payload);
};
</script>

<style scoped></style>
