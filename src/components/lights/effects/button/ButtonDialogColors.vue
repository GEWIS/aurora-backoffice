<template>
  <SelectorLightsColor v-model="colors" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import { type LightsButtonColors, RgbColor } from '@/api';

const props = defineProps<{
  defaultProperties?: LightsButtonColors;
}>();

const emit = defineEmits<{
  'update:modelValue': [properties: LightsButtonColors];
  inputValid: [valid: boolean];
}>();

const colors = ref<RgbColor[]>(props.defaultProperties?.colors || []);

const handleChange = () => {
  const properties: LightsButtonColors = {
    type: 'LightsButtonColors',
    colors: colors.value,
  };
  const inputIsValid: boolean = colors.value.length > 0;

  emit('update:modelValue', properties);
  emit('inputValid', inputIsValid);
};

watch([colors], handleChange);
onMounted(handleChange);
</script>

<style scoped></style>
