<script setup lang="ts">
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import { ref } from 'vue';
import SelectorBoolean from '@/components/lights/effects/props/SelectorBoolean.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { ColorEffects_BeatFadeOut, RgbColor } from '@/api';

const store = useEffectsControllerStore();

const colors = ref<RgbColor[]>([]);
const enableFade = ref<boolean>(false);
const addBlacks = ref<boolean>(false);

const handleAddEffect = () => {
  store.setColorEffect({
    type: ColorEffects_BeatFadeOut.BEAT_FADE_OUT,
    props: {
      colors: colors.value,
      enableFade: enableFade.value,
      nrBlacks: addBlacks.value ? 1 : 0
    }
  });
};
</script>

<template>
  <EffectSettingsDialog
    effect-name="BeatFadeOut"
    :can-save="colors.length > 0"
    @save="handleAddEffect"
  >
    <SelectorLightsColor @colors-updated="(c: RgbColor[]) => (colors = c)" />
    <SelectorBoolean
      id="enableFade"
      :checked="enableFade"
      name="Enable fade"
      @click="() => (enableFade = !enableFade)"
    />
    <SelectorBoolean
      id="addBlacks"
      :checked="addBlacks"
      name="Add blacks"
      @click="() => (addBlacks = !addBlacks)"
    />
  </EffectSettingsDialog>
</template>

<style scoped></style>
