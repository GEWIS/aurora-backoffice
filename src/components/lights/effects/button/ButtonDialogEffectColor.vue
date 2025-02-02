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
    :default-model-value="
      defaultProperties?.effectProps.type === ColorEffects_BeatFadeOut.BEAT_FADE_OUT
        ? defaultProperties.effectProps
        : undefined
    "
    :show-colors="false"
    @update:model-value="(e) => (effect = e)"
  />
  <EffectSparkle
    v-if="chosenEffect === ColorEffects_Sparkle.SPARKLE"
    :default-model-value="
      defaultProperties?.effectProps.type === ColorEffects_Sparkle.SPARKLE ? defaultProperties.effectProps : undefined
    "
    :show-colors="false"
    @update:model-value="(e) => (effect = e)"
  />
  <EffectStaticColor
    v-if="chosenEffect === ColorEffects_StaticColor.STATIC_COLOR"
    :default-model-value="
      defaultProperties?.effectProps.type === ColorEffects_StaticColor.STATIC_COLOR
        ? defaultProperties.effectProps
        : undefined
    "
    :show-colors="false"
    @update:model-value="(e) => (effect = e)"
  />
  <EffectWave
    v-if="chosenEffect === ColorEffects_Wave.WAVE"
    :default-model-value="
      defaultProperties?.effectProps.type === ColorEffects_Wave.WAVE ? defaultProperties.effectProps : undefined
    "
    :show-colors="false"
    @update:model-value="(e) => (effect = e)"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
  ColorEffects_BeatFadeOut,
  ColorEffects_Sparkle,
  ColorEffects_StaticColor,
  ColorEffects_Wave,
  type LightsButtonEffectColor,
  type LightsEffectsColorCreateParams,
} from '@/api';
import LightsGroupsSelect from '@/components/lights/effects/button/LightsGroupsSelect.vue';
import EffectBeatFadeOut from '@/components/lights/effects/color/EffectBeatFadeOut.vue';
import EffectWave from '@/components/lights/effects/color/EffectWave.vue';
import EffectStaticColor from '@/components/lights/effects/color/EffectStaticColor.vue';
import EffectSparkle from '@/components/lights/effects/color/EffectSparkle.vue';

const props = defineProps<{
  defaultProperties?: LightsButtonEffectColor;
}>();

const emit = defineEmits<{
  'update:modelValue': [properties: LightsButtonEffectColor];
  inputValid: [valid: boolean];
}>();

const chosenEffect = ref<LightsEffectsColorCreateParams['type'] | undefined>(props.defaultProperties?.effectProps.type);
const lightsGroupIds = ref<number[]>(props.defaultProperties?.lightsGroupIds || []);
const effect = ref<LightsEffectsColorCreateParams | undefined>(props.defaultProperties?.effectProps || undefined);

const effectOptions = computed(() => {
  return [
    { label: 'BeatFadeOut', value: ColorEffects_BeatFadeOut.BEAT_FADE_OUT },
    { label: 'Sparkle', value: ColorEffects_Sparkle.SPARKLE },
    { label: 'Static color', value: ColorEffects_StaticColor.STATIC_COLOR },
    { label: 'Wave', value: ColorEffects_Wave.WAVE },
  ];
});

const handleChange = () => {
  const inputIsValid: boolean = chosenEffect.value !== undefined && lightsGroupIds.value.length > 0;
  emit('inputValid', inputIsValid);

  if (effect.value === undefined) return;
  const properties: LightsButtonEffectColor = {
    type: 'LightsButtonEffectColor',
    lightsGroupIds: lightsGroupIds.value,
    effectProps: effect.value,
  };
  emit('update:modelValue', properties);
};

watch([chosenEffect, lightsGroupIds, effect], handleChange);
onMounted(handleChange);
</script>

<style scoped></style>
