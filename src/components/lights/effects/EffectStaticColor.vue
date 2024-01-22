<template>
  <EffectSettingsDialog
    :can-save="colors.length === 1"
    effect-name="StaticColor"
    @save="handleAddEffect"
  >
    <SelectorLightsColor single-color @colorsUpdated="(c) => colors = c" />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { ref } from 'vue';
import { type RgbColor, StaticColorCreateParams, StaticColorCreateParamsType } from '@/api/Client';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';

const store = useEffectsControllerStore();

const colors = ref<RgbColor[]>([]);

const handleAddEffect = () => {
  const createParams = new StaticColorCreateParams();
  createParams.type = StaticColorCreateParamsType.StaticColor;
  createParams.props.color = colors.value[0];

  store.addEffect(createParams);
};
</script>

<style scoped>

</style>