<script setup lang="ts">
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import LightsColorSelector from '@/components/lights/effects/props/LightsColorSelector.vue';
import {
  BeatFadeOutCreateParams,
  BeatFadeOutCreateParamsType,
  type RgbColor
} from '@/api/Client';
import { ref } from 'vue';

const emit = defineEmits<{
  addEffect: [effect: BeatFadeOutCreateParams],
}>();

const colors = ref<RgbColor[]>([]);

const handleAddEffect = () => {
  const createParams = new BeatFadeOutCreateParams();
  createParams.type = BeatFadeOutCreateParamsType.BeatFadeOut;
  createParams.props.colors = colors.value;

  emit('addEffect', createParams);
};
</script>

<template>
  <EffectSettingsDialog effect-name="Test" @save="handleAddEffect">
    <LightsColorSelector @colorsUpdated="(c: RgbColor[]) => colors = c" />
  </EffectSettingsDialog>
</template>

<style scoped>

</style>
