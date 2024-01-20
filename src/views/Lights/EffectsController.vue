<template>
  <div class="flex justify-content-start gap-4">
    <div class="flex flex-column gap-2 w-100">
      <div v-for="group in activeLightGroups" :key="group.id">
        <ToggleButton
          v-model="group.selected"
          on-label=""
          off-label=""
          class="flex flex-row w-auto"
        >
          <template #icon="slotProps">
            <div class="flex flex-column button-content px-2">
              <div>
                {{ group.name }}
              </div>
              <div>
                <ul class="my-0" style="margin-left: -1.5rem">
                  <li>Pars: {{ group.pars.length }}</li>
                  <li>MH's: {{ group.movingHeadRgbs.length + group.movingHeadWheels.length }}</li>
                </ul>
              </div>
            </div>
          </template>
        </ToggleButton>
      </div>
      <div v-for="group in inactiveLightGroups" :key="group.id">
        <ToggleButton
          disabled
          on-label=""
          off-label=""
          class="flex flex-row w-auto"
        >
          <template #icon="slotProps">
            <div class="flex flex-column button-content">
              <div>
                {{ group.name }}
              </div>
              <div>
                <ul class="my-0" style="margin-left: -1.5rem">
                  <li>Pars: {{ group.pars.length }}</li>
                  <li>MH's: {{ group.movingHeadRgbs.length + group.movingHeadWheels.length }}</li>
                </ul>
              </div>
            </div>
          </template>
        </ToggleButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Client, LightsGroup } from '@/api/Client';
import type { SelectedLightsGroup } from '@/entity/lights';
import { ref } from 'vue';

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
</script>

<style scoped lang="scss">
  @import "../../styles/BasePage.scss";

  .button-content > :nth-child(1) {
    font-weight: bold;
  }
</style>
