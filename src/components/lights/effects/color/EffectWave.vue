<template>
  <EffectSettingsDialog :can-save="colors.length === 1" effect-name="Wave" @save="handleAddEffect">
    <div class="flex flex-col gap-5">
      <SelectorLightsColor single-color @colors-updated="(c) => (colors = c)" />
      <SelectorRatioSlider
        id="waveSize"
        :max="1"
        :min="0"
        name="Wave size (ratio)"
        :step="0.05"
        :value="nrWaves"
        @update="(newVal: number) => (nrWaves = newVal)"
      />
      <SelectorRatioSlider
        id="waveCycleTime"
        :max="5000"
        :min="0"
        name="Cycle time (in ms)"
        :step="100"
        :value="cycleTime"
        @update="(newVal: number) => (cycleTime = newVal)"
      />
    </div>
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { ColorEffects_Wave, RgbColor } from '@/api';

const store = useEffectsControllerStore();

const colors = ref<RgbColor[]>([]);
const nrWaves = ref<number>(1);
const cycleTime = ref<number>(1000);

const handleAddEffect = () => {
  store.setColorEffect({
    type: ColorEffects_Wave.WAVE,
    props: {
      color: colors.value[0],
      nrWaves: nrWaves.value,
      cycleTime: cycleTime.value
    }
  });
};
</script>

<style scoped></style>
