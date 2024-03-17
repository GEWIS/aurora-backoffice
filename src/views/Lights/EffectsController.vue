<template>
  <div class="page-container">
    <div class="page-title flex flex-row align-items-center justify-content-between">
      <span>Effects controller</span>
      <BeatVisualizer />
    </div>
    <div class="grid">
      <div class="md:col-4 lg:col-3">
        <Card class="w-full">
          <template #title>(1) Lights groups</template>
          <template #content>
            <div class="flex flex-column gap-2 w-100">
              <div class="flex flex-row gap-2 w-100">
                <Button
                  class="flex-1 text-center"
                  severity="secondary"
                  @click="effectsControllerStore.resetLightsGroupSelection()"
                  >Reset</Button
                >
                <Button
                  class="flex-1 text-center"
                  severity="secondary"
                  @click="effectsControllerStore.selectAllLightsGroups(activeLightGroups)"
                  >Select all</Button
                >
              </div>
              <div v-for="group in activeLightGroups" :key="group.id">
                <LightsGroupToggleButton
                  :lights-group="group"
                  :enabled="effectsControllerStore.selectedLightsGroupIds.includes(group.id)"
                  @click="() => effectsControllerStore.toggleLightsGroup(group.id)"
                />
              </div>
              <div v-for="group in inactiveLightGroups" :key="group.id">
                <LightsGroupToggleButton :lights-group="group" disabled />
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-8 lg:col-6 flex flex-column gap-3">
        <Card>
          <template #title> (2) Create effects </template>
          <template #content>
            <h4 class="mt-0 mb-1">Colors</h4>
            <div class="flex flex-row flex-wrap gap-2 mb-3">
              <EffectBeatFadeOut />
              <EffectSparkle />
              <EffectStaticColor />
              <EffectWave />
            </div>
            <h4 class="mt-2 mb-1">Movement</h4>
            <div class="flex flex-row flex-wrap gap-2">
              <EffectSearchLight />
              <EffectRandomPosition />
              <EffectTableRotate />
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 lg:col-3">
        <Card class="w-100">
          <template #title> Other effects & settings </template>
          <template #content>
            <div class="flex flex-row gap-2 flex-wrap">
              <StrobeButton />
              <ArtificialBeatDialog />
              <Button
                @click="() => effectsControllerStore.disableLightsColors()"
                severity="danger"
                :disabled="effectsControllerStore.selectedLightsGroupIds.length === 0"
              >
                Disable colors
              </Button>
              <Button
                @click="() => effectsControllerStore.disableLightsMovement()"
                severity="danger"
                :disabled="effectsControllerStore.selectedLightsGroupIds.length === 0"
              >
                Disable movement
              </Button>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12">
        <Card class="w-100">
          <template #title> Past effects </template>
          <template #content>
            <div class="overflow-y-scroll w-full">
              <div class="flex flex-row gap-3">
                <div
                  v-for="effect in effectsControllerStore.pastPushedEffects"
                  :key="effect.timestamp.getTime()"
                >
                  <EffectHistoryCard :effect="effect" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LightsGroupToggleButton from '@/components/lights/effects/LightsGroupToggleButton.vue';
import EffectBeatFadeOut from '@/components/lights/effects/color/EffectBeatFadeOut.vue';
import { useHandlersStore } from '@/stores/handlers.store';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import StrobeButton from '@/components/lights/effects/other/StrobeButton.vue';
import EffectSearchLight from '@/components/lights/effects/movement/EffectSearchLight.vue';
import EffectSparkle from '@/components/lights/effects/color/EffectSparkle.vue';
import EffectStaticColor from '@/components/lights/effects/color/EffectStaticColor.vue';
import EffectWave from '@/components/lights/effects/color/EffectWave.vue';
import EffectHistoryCard from '@/components/lights/effects/EffectHistoryCard.vue';
import BeatVisualizer from '@/components/BeatVisualizer.vue';
import ArtificialBeatDialog from '@/components/audio/ArtificialBeatDialog.vue';
import EffectRandomPosition from '@/components/lights/effects/movement/EffectRandomPosition.vue';
import EffectTableRotate from '@/components/lights/effects/movement/EffectTableRotate.vue';
import { useSubscriberStore } from '@/stores/subscriber.store';

const handlersStore = useHandlersStore();
const effectsControllerStore = useEffectsControllerStore();
const subscriberStore = useSubscriberStore();

const activeLightGroups = handlersStore.getRegisteredLights('SetEffectsHandler');
const inactiveLightGroups = subscriberStore.lightsGroups.filter(
  (l1) => !activeLightGroups.find((l2) => l1.id === l2.id)
);
</script>

<style scoped lang="scss">
.grid > div {
  padding: 0.5rem;
}
</style>
