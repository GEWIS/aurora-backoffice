<template>
  <EffectSettingsDialog can-save effect-name="RandomPosition" @save="handleAddEffect">
    <SelectorRatioSlider
      id="beats-to-move"
      :min="1"
      :max="4"
      :step="1"
      :value="beatsToMove"
      name="Number of beats before changing position"
      @update="(newVal: number) => (beatsToMove = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { MovementEffects_RandomPosition } from '@/api';

const store = useEffectsControllerStore();

const beatsToMove = ref<number>(1);

const handleAddEffect = () => {
  store.setMovementEffect({
    type: MovementEffects_RandomPosition.RANDOM_POSITION,
    props: {
      beatsToMove: beatsToMove.value
    }
  });
};
</script>

<style scoped></style>
