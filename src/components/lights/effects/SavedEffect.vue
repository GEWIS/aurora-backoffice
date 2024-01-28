<template>
  <Chip :removable="removeable" @remove="store.removeColorEffect(index)">
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
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { type LightsEffectsColorCreateParams, RgbColor, SearchLightCreateParams } from '@/api/Client';
import ColorBox from '@/components/ColorBox.vue';
import { useColorStore } from '@/stores/color.store';

const store = useEffectsControllerStore();
const colorStore = useColorStore();

const props = defineProps<{
  effect: LightsEffectsColorCreateParams | SearchLightCreateParams;
  index: number;
  removeable?: boolean;
}>();

const colors =
  props.effect.props.colors ??
  (props.effect.props.color ? [props.effect.props.color] : undefined) ??
  [];
</script>

<style scoped></style>
