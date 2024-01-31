<script setup lang="ts">
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import { BeatFadeOutCreateParams, BeatFadeOutCreateParamsType, type RgbColor } from '@/api/Client';
import { ref } from 'vue';
import SelectorBoolean from '@/components/lights/effects/props/SelectorBoolean.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';

const store = useEffectsControllerStore();

const colors = ref<RgbColor[]>([]);
const enableFade = ref<boolean>(false);
const addBlacks = ref<boolean>(false);

const handleAddEffect = () => {
  const createParams = new BeatFadeOutCreateParams();
  createParams.type = BeatFadeOutCreateParamsType.BeatFadeOut;
  createParams.props.colors = colors.value;
  createParams.props.enableFade = enableFade.value;
  createParams.props.nrBlacks = addBlacks.value ? 1 : 0;

  store.addColorEffect(createParams);
};
</script>

<template>
  <EffectSettingsDialog
    effect-name="BeatFadeOut"
    :can-save="colors.length > 0"
    @save="handleAddEffect"
  >
    <SelectorLightsColor @colorsUpdated="(c: RgbColor[]) => (colors = c)" />
    <SelectorBoolean
      :checked="enableFade"
      @click="() => (enableFade = !enableFade)"
      id="enableFade"
      name="Enable fade"
    />
    <SelectorBoolean
      :checked="addBlacks"
      @click="() => (addBlacks = !addBlacks)"
      id="addBlacks"
      name="Add blacks"
    />
  </EffectSettingsDialog>
</template>

<style scoped></style>
