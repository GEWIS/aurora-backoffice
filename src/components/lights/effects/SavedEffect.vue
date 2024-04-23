<template>
  <Chip :removable="removeable" @remove="$emit('remove')">
    <template #default>
      <div class="flex flex-row gap-1 align-items-center">
        <div>
          {{ effect.type }}
        </div>
        <ColorBox
          v-for="color in colors"
          :key="color"
          :color="colorStore.getHexColor(color as RgbColor)"
        />
      </div>
    </template>
  </Chip>
</template>

<script setup lang="ts">
import ColorBox from '@/components/ColorBox.vue';
import { useColorStore } from '@/stores/color.store';
import {
  type LightsEffectsColorCreateParams,
  type LightsEffectsMovementCreateParams,
  type RgbColor
} from '@/api';

const colorStore = useColorStore();

const props = defineProps<{
  effect: LightsEffectsColorCreateParams | LightsEffectsMovementCreateParams;
  removeable?: boolean;
}>();

defineEmits<{
  remove: [];
}>();

let colors: Array<RgbColor>;
if ('colors' in props.effect.props) {
  colors = props.effect.props.colors;
} else if ('color' in props.effect.props) {
  colors = [props.effect.props.color];
} else {
  colors = [];
}
</script>

<style scoped></style>
