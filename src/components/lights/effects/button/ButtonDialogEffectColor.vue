<template>
  <Select
    id="controller-button-color-effect"
    v-model="chosenEffect"
    option-label="label"
    option-value="value"
    :options="effectOptions"
    placeholder="Select an effect..."
  />
  <LightsGroupsSelect v-model="lightsGroupIds" />
  <Divider />
  <EffectBeatFadeOut
    v-if="chosenEffect === ColorEffects_BeatFadeOut.BEAT_FADE_OUT"
    :show-colors="false"
    @update:model-value="(e) => (effect = e)"
  />
  <EffectSparkle
    v-if="chosenEffect === ColorEffects_Sparkle.SPARKLE"
    :show-colors="false"
    @update:model-value="(e) => (effect = e)"
  />
  <EffectStaticColor
    v-if="chosenEffect === ColorEffects_StaticColor.STATIC_COLOR"
    :show-colors="false"
    @update:model-value="(e) => (effect = e)"
  />
  <EffectWave
    v-if="chosenEffect === ColorEffects_Wave.WAVE"
    :show-colors="false"
    @update:model-value="(e) => (effect = e)"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  ColorEffects_BeatFadeOut,
  ColorEffects_Sparkle,
  ColorEffects_StaticColor,
  ColorEffects_Wave,
  type LightsEffectsColorCreateParams,
} from '@/api';
import LightsGroupsSelect from '@/components/lights/effects/button/LightsGroupsSelect.vue';
import EffectBeatFadeOut from '@/components/lights/effects/color/EffectBeatFadeOut.vue';
import EffectWave from '@/components/lights/effects/color/EffectWave.vue';
import EffectStaticColor from '@/components/lights/effects/color/EffectStaticColor.vue';
import EffectSparkle from '@/components/lights/effects/color/EffectSparkle.vue';

const chosenEffect = ref<LightsEffectsColorCreateParams['type']>();
const effect = ref<LightsEffectsColorCreateParams>();
const lightsGroupIds = ref<number[]>([]);

const effectOptions = computed(() => {
  return [
    { label: 'BeatFadeOut', value: ColorEffects_BeatFadeOut.BEAT_FADE_OUT },
    { label: 'Sparkle', value: ColorEffects_Sparkle.SPARKLE },
    { label: 'Static color', value: ColorEffects_StaticColor.STATIC_COLOR },
    { label: 'Wave', value: ColorEffects_Wave.WAVE },
  ];
});
</script>

<style scoped></style>
