<template>
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
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { type ClassicRotateCreateParams, MovementEffects_ClassicRotate } from '@/api';

const props = defineProps<{
  modelValue?: ClassicRotateCreateParams;
}>();

const emit = defineEmits<{
  'update:modelValue': [props: ClassicRotateCreateParams];
}>();

const cycleTime = ref<number>(props.modelValue?.props.cycleTime || 10000);
const offsetFactor = ref<number>(props.modelValue?.props.offsetFactor || 0);

const handleChange = () => {
  const payload: ClassicRotateCreateParams = {
    type: MovementEffects_ClassicRotate.CLASSIC_ROTATE,
    props: {
      cycleTime: cycleTime.value,
      offsetFactor: offsetFactor.value,
    },
  };
  emit('update:modelValue', payload);
};

watch([cycleTime, offsetFactor], handleChange);
onMounted(handleChange);
</script>

<style scoped></style>
