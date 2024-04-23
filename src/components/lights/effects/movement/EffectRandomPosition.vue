<template>
  <EffectSettingsDialog can-save effect-name="RandomPosition" @save="handleAddEffect">
    <SelectorRatioSlider
      :min="1"
      :max="4"
      :step="1"
      :value="beatsToMove"
      @update="(newVal: number) => (beatsToMove = newVal)"
      id="beats-to-move"
      name="Number of beats before changing position"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { type RandomPositionCreateParams } from '@/api';

const store = useEffectsControllerStore();

const beatsToMove = ref<number>(1);

const handleAddEffect = () => {
  store.setMovementEffect({
    type: 'RandomPosition' as RandomPositionCreateParams['type'],
    props: {
      beatsToMove: beatsToMove.value
    }
  });
};
</script>

<style scoped></style>
