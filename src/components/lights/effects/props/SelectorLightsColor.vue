<template>
  <div>
    <h4 class="m-1">Color*</h4>
    <div class="flex flex-row flex-wrap gap-1">
      <ToggleButton
        v-for="color in colors"
        :key="color"
        :model-value="selectedColors.includes(color as RgbColorEnum)"
        :on-label="color"
        :off-label="color"
        class="p-button-secondary"
        @click="handleColorClick(color as RgbColorEnum)"
      >
        <template #icon>
          <div class="mr-1">
            <ColorBox :color="store.getHexColor(color as RgbColorEnum)" />
          </div>
        </template>
      </ToggleButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useColorStore } from '@/stores/color.store';
import ColorBox from '@/components/ColorBox.vue';
import { RgbColorEnum } from '@/api';

const store = useColorStore();

const props = defineProps<{
  singleColor?: boolean;
}>();
const emit = defineEmits<{
  colorsUpdated: [colors: RgbColorEnum[]];
}>();

const colors: string[] = Object.values(RgbColorEnum);
const selectedColors: Ref<RgbColorEnum[]> = ref([]);

const handleColorClick = (color: RgbColorEnum) => {
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

<style scoped></style>
