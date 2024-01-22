<template>
  <EffectSettingsDialog
    can-save
    effect-name="SingleFlood"
    @save="handleAddEffect"
  >
    <SelectorRatioSlider
      id="dimMilliseconds"
      :min="0"
      :max="3000"
      name="Dim time (in ms)"
      :step="100"
      :value="dimMilliseconds"
      @update="(newVal: number) => dimMilliseconds = newVal"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { SearchLightCreateParamsType, SingleFloodCreateParams } from '@/api/Client';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';

const store = useEffectsControllerStore();

const dimMilliseconds = ref<number>(500);

const handleAddEffect = () => {
  const createParams = new SingleFloodCreateParams();
  createParams.type = SearchLightCreateParamsType.SearchLight;
  createParams.props.dimMilliseconds = dimMilliseconds.value;

  store.addEffect(createParams);
};
</script>

<style scoped>

</style>