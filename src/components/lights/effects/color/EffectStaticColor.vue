<template>
  <EffectSettingsDialog
    :can-save="colors.length === 1"
    effect-name="StaticColor"
    @save="handleAddEffect"
  >
    <SelectorLightsColor single-color @colors-updated="(c) => (colors = c)" />
    <Select v-model="gobo" :options="gobos" placeholder="Select a gobo" show-clear />
    <Select
      v-model="goboRotate"
      :options="goboRotates"
      placeholder="Select a gobo rotate effect"
      show-clear
    />
    <SelectorBoolean
      id="beat-toggle"
      name="Beat Toggle"
      :checked="beatToggle"
      @click="beatToggle = !beatToggle"
    />
    <SelectorRatioSlider
      id="relative-brightness"
      :min="0"
      :max="1"
      name=""
      :step="0.05"
      :value="relativeBrightness"
      @update="(newVal) => (relativeBrightness = newVal)"
    />
  </EffectSettingsDialog>
</template>

<script setup lang="ts">
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import { computed, type ComputedRef, ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorBoolean from '@/components/lights/effects/props/SelectorBoolean.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { ColorEffects_StaticColor, RgbColor } from '@/api';
import { useSubscriberStore } from '@/stores/subscriber.store';

const store = useEffectsControllerStore();
const subscriberStore = useSubscriberStore();
const gobos: ComputedRef<string[]> = computed(() => {
  return subscriberStore.lightsGroups
    .map((g) => g.movingHeadWheels.map((w) => w.fixture.gobos))
    .flat()
    .flat()
    .filter((n1, index, all) => index === all.findIndex((n2) => n1 === n2));
});
const goboRotates: ComputedRef<string[]> = computed(() => {
  return subscriberStore.lightsGroups
    .map((g) => g.movingHeadWheels.map((w) => w.fixture.goboRotates))
    .flat()
    .flat()
    .filter((n1, index, all) => index === all.findIndex((n2) => n1 === n2));
});

const colors = ref<RgbColor[]>([]);
const gobo = ref<string>('');
const goboRotate = ref<string>('');
const beatToggle = ref<boolean>(false);
const relativeBrightness = ref<number>(1);

const handleAddEffect = () => {
  store.setColorEffect({
    type: ColorEffects_StaticColor.STATIC_COLOR,
    props: {
      color: colors.value[0],
      gobo: gobo.value ? gobo.value : undefined,
      goboRotate: goboRotate.value ? goboRotate.value : undefined,
      beatToggle: beatToggle.value,
      relativeBrightness: relativeBrightness.value
    }
  });
};
</script>

<style scoped></style>
