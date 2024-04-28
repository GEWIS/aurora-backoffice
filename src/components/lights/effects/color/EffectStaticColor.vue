<template>
  <EffectSettingsDialog
    :can-save="colors.length === 1"
    effect-name="StaticColor"
    @save="handleAddEffect"
  >
    <SelectorLightsColor single-color @colorsUpdated="(c) => (colors = c)" />
    <Dropdown v-model="gobo" :options="gobos" placeholder="Select a gobo" show-clear />
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
import { computed, ref } from 'vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import SelectorBoolean from '@/components/lights/effects/props/SelectorBoolean.vue';
import SelectorRatioSlider from '@/components/lights/effects/props/SelectorRatioSlider.vue';
import { RgbColor, StaticColorCreateParams } from '@/api';
import { useSubscriberStore } from '@/stores/subscriber.store';

const store = useEffectsControllerStore();
const subscriberStore = useSubscriberStore();
const gobos: string[] = computed(() => {
  return subscriberStore.lightsGroups
    .map((g) => g.movingHeadWheels.map((w) => w.gobos))
    .flat()
    .flat();
});

const colors = ref<RgbColor[]>([]);
const gobo = ref<string>('');
const beatToggle = ref<boolean>(false);
const relativeBrightness = ref<number>(1);

const handleAddEffect = () => {
  store.setColorEffect({
    type: StaticColorCreateParams.type.STATIC_COLOR,
    props: {
      color: colors.value[0],
      gobo: gobo.value ? gobo.value : undefined,
      beatToggle: beatToggle.value,
      relativeBrightness: relativeBrightness.value
    }
  });
};
</script>

<style scoped></style>
