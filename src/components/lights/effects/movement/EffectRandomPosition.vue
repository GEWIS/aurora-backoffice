<template>
  <EffectSettingsDialog can-save effect-name="RandomPosition" @save="handleAddEffect">
    <SelectorRatioSlider
      id="beats-to-move"
      :max="4"
      :min="1"
      name="Number of beats before changing position"
      :step="1"
      :value="beatsToMove"
      @update="(newVal: number) => (beatsToMove = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { type RandomPositionProps } from '@/api';

const props = defineProps<{
  effectProps?: Partial<RandomPositionProps>;
}>();

const emit = defineEmits<{
  save: [props: RandomPositionProps];
}>();

const beatsToMove = ref<number>(props.effectProps?.beatsToMove || 1);

const handleAddEffect = () => {
  const payload: RandomPositionProps = {
    beatsToMove: beatsToMove.value,
  };
  emit('save', payload);
};
</script>

<style scoped></style>
