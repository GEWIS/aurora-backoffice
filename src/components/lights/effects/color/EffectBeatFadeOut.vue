<template>
  <EffectSettingsDialog :can-save="colors.length > 0" effect-name="BeatFadeOut" @save="handleAddEffect">
    <SelectorLightsColor v-if="showColors" @colors-updated="(c: RgbColor[]) => (colors = c)" />
    <SelectorPattern v-model="pattern" />
    <SelectorDirection v-model="direction" />
    <SelectorBoolean
      id="enableFade"
      :checked="enableFade"
      name="Enable fade"
      @click="() => (enableFade = !enableFade)"
    />
    <SelectorBoolean id="addBlacks" :checked="addBlacks" name="Add blacks" @click="() => (addBlacks = !addBlacks)" />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorBoolean from '@/components/lights/effects/props/SelectorBoolean.vue';
import { type BeatFadeOutProps, LightsEffectDirection, LightsEffectPattern, RgbColor } from '@/api';
import SelectorPattern from '@/components/lights/effects/props/SelectorPattern.vue';
import SelectorDirection from '@/components/lights/effects/props/SelectorDirection.vue';

const props = defineProps<{
  showColors: boolean;
  effectProps?: Partial<BeatFadeOutProps>;
}>();

const emit = defineEmits<{
  save: [props: BeatFadeOutProps];
}>();

const colors = ref<RgbColor[]>(props.effectProps?.colors || []);
const enableFade = ref<boolean>(props.effectProps?.enableFade || false);
const addBlacks = ref<boolean>(props.effectProps?.nrBlacks !== 0 || false);
const pattern = ref<LightsEffectPattern>(props.effectProps?.pattern || LightsEffectPattern.HORIZONTAL);
const direction = ref<LightsEffectDirection>(props.effectProps?.direction || LightsEffectDirection.FORWARDS);

const handleAddEffect = () => {
  const payload: BeatFadeOutProps = {
    colors: colors.value,
    enableFade: enableFade.value,
    nrBlacks: addBlacks.value ? 1 : 0,
    pattern: pattern.value,
    direction: direction.value,
  };
  emit('save', payload);
};
</script>

<style scoped></style>
