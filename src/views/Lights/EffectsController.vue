<template>
  <div class="flex justify-content-start gap-4">
    <Card>
      <template #content>
        <div class="flex flex-column gap-2 w-100">
          <div class="flex flex-row gap-2">
            <Button severity="secondary">Reset</Button>
            <Button severity="secondary">Select all</Button>
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
    <div>
      <EffectSettingsDialog effect-name="Test">
        <LightsColorSelector />
      </EffectSettingsDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Client, LightsGroup } from '@/api/Client';
import type { SelectedLightsGroup } from '@/entity/lights';
import { ref } from 'vue';
import LightsGroupToggleButton from '@/components/lights/effects/LightsGroupToggleButton.vue';
import EffectSettingsDialog from '@/components/lights/effects/EffectSettingsDialog.vue';
import LightsColorSelector from '@/components/lights/effects/props/LightsColorSelector.vue';

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
</style>
