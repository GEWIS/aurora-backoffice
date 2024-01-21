<template>
  <div class="grid">
    <div class="col-3">
      <Card class="w-100">
        <template #title>(1) Lights groups</template>
        <template #content>
          <div class="flex flex-column gap-2 w-100">
            <div class="flex flex-row gap-2">
              <Button severity="secondary" @click="effectsControllerStore.resetLightsGroupSelection()">Reset</Button>
              <Button severity="secondary" @click="effectsControllerStore.selectAllLightsGroups(activeLightGroups);">Select all</Button>
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
          <ul>
            <li v-for="e in effectsControllerStore.chosenEffects" :key="e['type']">
              {{ e['type'] }}
            </li>
          </ul>
        </template>
        <template #footer>
          <Button @click="() => effectsControllerStore.sendEffects()">Send</Button>
        </template>
      </Card>
    </div>
    <div class="col-3">
      <Card class="w-100">
        <template #title>
          Other effects & settings
        </template>
        <template #content>
          Hello!
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
