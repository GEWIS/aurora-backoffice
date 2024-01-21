<template>
  <div class="grid">
    <div class="col-3">
      <Card class="w-100">
        <template #title>(1) Lights groups</template>
        <template #content>
          <div class="flex flex-column gap-2 w-100">
            <div class="flex flex-row gap-2 w-100">
              <Button class="flex-1 text-center" severity="secondary" @click="effectsControllerStore.resetLightsGroupSelection()">Reset</Button>
              <Button class="flex-1 text-center" severity="secondary" @click="effectsControllerStore.selectAllLightsGroups(activeLightGroups);">Select all</Button>
            </div>
            <div v-for="group in activeLightGroups" :key="group.id">
              <LightsGroupToggleButton
                :lights-group="group"
                :enabled="effectsControllerStore.selectedLightsGroupIds.includes(group.id)"
                @click="() => effectsControllerStore.toggleLightsGroup(group.id)"
              />
            </div>
            <div v-for="group in inactiveLightGroups" :key="group.id">
              <LightsGroupToggleButton
                :lights-group="group"
                disabled
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-6 flex flex-column gap-3">
      <Card>
        <template #title>
          (2) Create effects
        </template>
        <template #content>
          <BeatFadeOutEffect @add-effect="(effect) => effectsControllerStore.addEffect(effect)" />
        </template>
      </Card>
      <Card>
        <template #title>(3) Saved effects</template>
        <template #content>
          <div class="flex flex-row gap-2 flex-wrap" v-if="effectsControllerStore.chosenEffects.length > 0">
            <div v-for="(effect, index) in effectsControllerStore.chosenEffects" :key="effect.type">
              <SavedEffect :effect="effect" :index="index" removeable />
            </div>
          </div>
          <div v-else>
            <span class="font-italic">There are no effects, meaning that sending will turn the selected groups off.</span>
          </div>
        </template>
        <template #footer>
          <div class="flex flex-row justify-content-end gap-2">
            <Button
              @click="() => effectsControllerStore.clearEffects()"
              severity="secondary"
              :disabled="effectsControllerStore.chosenEffects.length === 0"
            >
              Clear
            </Button>
            <Button
              @click="() => effectsControllerStore.sendEffects()"
              :disabled="effectsControllerStore.selectedLightsGroupIds.length === 0"
            >
              Send
            </Button>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-3">
      <Card class="w-100">
        <template #title>
          Other effects & settings
        </template>
        <template #content>
          <StrobeButton />
        </template>
      </Card>
    </div>
    <div class="col-12">
      <Card class="w-100">
        <template #title>
          Past effects
        </template>
        <template #content>
          <div v-for="effect in effectsControllerStore.pastPushedEffects" :key="effect.timestamp.getTime()">
            {{ effect.timestamp }}
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import LightsGroupToggleButton from '@/components/lights/effects/LightsGroupToggleButton.vue';
import BeatFadeOutEffect from '@/components/lights/effects/BeatFadeOutEffect.vue';
import { useHandlersStore } from '@/stores/handlers.store';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import StrobeButton from '@/components/lights/effects/other/StrobeButton.vue';
import SavedEffect from '@/components/lights/effects/SavedEffect.vue';

const handlersStore = useHandlersStore();
const effectsControllerStore = useEffectsControllerStore();
const activeLightGroups = handlersStore.getRegisteredLights('SetEffectsHandler');
const inactiveLightGroups = handlersStore.getRegisteredLights()
  .filter((l1) => !activeLightGroups.find((l2) => l1.id === l2.id));
</script>

<style scoped lang="scss">
.grid > div {
  padding: 0.5rem;
}
</style>
