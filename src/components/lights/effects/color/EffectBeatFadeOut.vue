<template>
  <SelectorLightsColor v-if="showColors" v-model="colors" />
  <SelectorPattern v-model="pattern" />
  <SelectorDirection v-model="direction" />
  <SelectorBoolean id="enableFade" :checked="enableFade" name="Enable fade" @click="() => (enableFade = !enableFade)" />
  <SelectorBoolean id="addBlacks" :checked="addBlacks" name="Add blacks" @click="() => (addBlacks = !addBlacks)" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorBoolean from '@/components/lights/effects/props/SelectorBoolean.vue';
import {
  type BeatFadeOutCreateParams,
  ColorEffects_BeatFadeOut,
  LightsEffectDirection,
  LightsEffectPattern,
  RgbColor,
} from '@/api';
import SelectorPattern from '@/components/lights/effects/props/SelectorPattern.vue';
import SelectorDirection from '@/components/lights/effects/props/SelectorDirection.vue';

const props = defineProps<{
  showColors: boolean;
  modelValue?: BeatFadeOutCreateParams;
}>();

const emit = defineEmits<{
  'update:modelValue': [modelValue: BeatFadeOutCreateParams];
}>();

const colors = ref<RgbColor[]>(props.modelValue?.props.colors || []);
const enableFade = ref<boolean>(props.modelValue?.props.enableFade || false);
const addBlacks = ref<boolean>(props.modelValue?.props.nrBlacks !== 0 || false);
const pattern = ref<LightsEffectPattern>(props.modelValue?.props.pattern || LightsEffectPattern.HORIZONTAL);
const direction = ref<LightsEffectDirection>(props.modelValue?.props.direction || LightsEffectDirection.FORWARDS);

const handleChange = () => {
  const payload: BeatFadeOutCreateParams = {
    type: ColorEffects_BeatFadeOut.BEAT_FADE_OUT,
    props: {
      colors: colors.value,
      enableFade: enableFade.value,
      nrBlacks: addBlacks.value ? 1 : 0,
      pattern: pattern.value,
      direction: direction.value,
    },
  };
  emit('update:modelValue', payload);
};

watch([colors, enableFade, addBlacks, pattern, direction], handleChange);
onMounted(handleChange);
</script>

<style scoped></style>
