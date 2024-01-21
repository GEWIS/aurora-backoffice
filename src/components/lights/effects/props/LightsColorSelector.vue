<template>
  <div>
    <h4 class="m-1">Color*</h4>
    <div class="flex flex-row flex-wrap gap-1">
      <ToggleButton
        v-for="color in colors" :key="color"
        :model-value="selectedColors.includes(color as RgbColor)"
        :on-label="color"
        :off-label="color"
        class="p-button-secondary"
        @click="handleColorClick(color as RgbColor)"
      >
        <template #icon>
          <div class="mr-1">
            <ColorBox :color="store.getHexColor(color as RgbColor)" />
          </div>
        </template>
      </ToggleButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RgbColor } from '@/api/Client';
import { type Ref, ref } from 'vue';
import { useColorStore } from '@/stores/color.store';
import ColorBox from '@/components/ColorBox.vue';

const store = useColorStore();

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

<style scoped>
</style>
