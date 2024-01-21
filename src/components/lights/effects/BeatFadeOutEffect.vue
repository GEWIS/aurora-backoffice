<script setup lang="ts">
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import LightsColorSelector from '@/components/lights/effects/props/LightsColorSelector.vue';
import {
  BeatFadeOutCreateParams,
  BeatFadeOutCreateParamsType,
  type RgbColor
} from '@/api/Client';
import { ref } from 'vue';
import BooleanSelector from '@/components/lights/effects/props/BooleanSelector.vue';

const emit = defineEmits<{
  addEffect: [effect: BeatFadeOutCreateParams],
}>();

const colors = ref<RgbColor[]>([]);
const enableFade = ref<boolean>(false);
const addBlacks = ref<boolean>(false);

const handleAddEffect = () => {
  const createParams = new BeatFadeOutCreateParams();
  createParams.type = BeatFadeOutCreateParamsType.BeatFadeOut;
  createParams.props.colors = colors.value;
  createParams.props.enableFade = enableFade.value;
  createParams.props.addBlacks = addBlacks.value;

  emit('addEffect', createParams);
};
</script>

<template>
  <EffectSettingsDialog
    effect-name="BeatFadeOut"
    :can-save="colors.length > 0"
    @save="handleAddEffect"
  >
    <LightsColorSelector @colorsUpdated="(c: RgbColor[]) => colors = c" />
    <BooleanSelector :checked="enableFade" @click="() => enableFade = !enableFade" id="enableFade" name="Enable fade" />
    <BooleanSelector :checked="addBlacks" @click="() => addBlacks = !addBlacks" id="addBlacks" name="Add blacks" />
  </EffectSettingsDialog>
</template>

<style scoped>

</style>
