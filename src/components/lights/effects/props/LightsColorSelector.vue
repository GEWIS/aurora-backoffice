<script setup lang="ts">
import { RgbColor } from '@/api/Client';
import { type Ref, ref } from 'vue';

const props = defineProps<{
  singleColor?: boolean;
}>();
const emit = defineEmits<{
  colorsUpdated: [colors: RgbColor[]]
}>();

const colors: string[] = Object.values(RgbColor);
const selectedColors: Ref<RgbColor[]> = ref([]);

const handleColorClick = (color: RgbColor) => {
  const i = selectedColors.value.findIndex((c) => c === color);
  if (props.singleColor) {
    selectedColors.value = [color];
  } else if (i < 0) {
    selectedColors.value.push(color);
  } else {
    selectedColors.value.splice(i, 1);
  }
  emit('colorsUpdated', selectedColors.value);
};
</script>

<template>
  <h4>Color</h4>
  <div class="flex flex-row flex-wrap gap-1">
    <ToggleButton
      :model-value="selectedColors.includes(color as RgbColor)"
      :on-label="color"
      :off-label="color"
      v-for="color in colors" :key="color"
      @click="handleColorClick(color as RgbColor)"
    />
  </div>
</template>

<style scoped>

</style>
