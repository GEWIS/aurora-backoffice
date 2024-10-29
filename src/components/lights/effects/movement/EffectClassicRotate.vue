<template>
  <EffectSettingsDialog can-save effect-name="ClassicRotate" @save="handleAddEffect">
    <div class="flex flex-col gap-5">
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
    </div>
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { MovementEffects_ClassicRotate } from '@/api';

const store = useEffectsControllerStore();

const cycleTime = ref<number>(10000);
const offsetFactor = ref<number>(0);

const handleAddEffect = () => {
  store.setMovementEffect({
    type: MovementEffects_ClassicRotate.CLASSIC_ROTATE,
    props: {
      cycleTime: cycleTime.value,
      offsetFactor: offsetFactor.value
    }
  });
};
</script>

<style scoped></style>
