<template>
  <div class="grid">
    <div class="col-3">
      <Card class="w-100">
        <template #title>(1) Lights groups</template>
        <template #content>
          <div class="flex flex-column gap-2 w-100">
            <div class="flex flex-row gap-2">
              <Button severity="secondary" @click="reset">Reset</Button>
              <Button severity="secondary" @click="selectAll">Select all</Button>
            </div>
            <div v-for="group in activeLightGroups" :key="group.id">
              <LightsGroupToggleButton
                :lights-group="group"
                @click="() => {group.selected = !group.selected; console.log(group.selected);}"
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
          <BeatFadeOutEffect @add-effect="(effect) => {chosenEffects.push(effect); console.log('after event', effect)}" />
        </template>
      </Card>
      <Card>
        <template #title>(3) Saved effects</template>
        <template #content>
          <ul>
            <li v-for="e in chosenEffects" :key="e.type">
              {{ e.type }}
            </li>
          </ul>
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
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Client,
  LightsEffectsCreateParams,
  LightsGroup
} from '@/api/Client';
import type { SelectedLightsGroup } from '@/entity/lights';
import { type Ref, ref } from 'vue';
import LightsGroupToggleButton from '@/components/lights/effects/LightsGroupToggleButton.vue';
import BeatFadeOutEffect from '@/components/lights/effects/BeatFadeOutEffect.vue';

const client = new Client();
const getLightsPromise = client.getLightsHandlers();

const activeLightGroups = ref((await getLightsPromise.then((handlers) => {
  const handler = handlers.find((h) => h.name === 'SetEffectsHandler');
  if (!handler) return [];
  return handler.entities;
})).map((g: LightsGroup): SelectedLightsGroup => ({
  ...g,
  selected: ref(false),
})));

const inactiveLightGroups: LightsGroup[] = await getLightsPromise.then((handlers) => {
  const otherHandlers = handlers.filter((h) => h.name !== 'SetEffectsHandler');
  return otherHandlers.map((h) => h.entities).flat();
});

const chosenEffects: Ref<LightsEffectsCreateParams[]> = ref([]);

const selectAll = () => {
  activeLightGroups.value.forEach((g) => g.selected = true);
};
const reset = () => {
  activeLightGroups.value.forEach((g) => g.selected = false);
};
</script>

<style scoped lang="scss">
.grid > div {
  padding: 0.5rem;
}
</style>
