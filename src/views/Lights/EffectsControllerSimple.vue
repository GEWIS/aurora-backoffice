<template>
  <AppContainer icon="pi-sparkles" title="Effects controller">
    <template #header>
      <div class="flex flex-row gap-6 items-center">
        <Button v-if="!editing" icon="pi pi-pencil" label="Edit" @click="editing = !editing" />
        <Button v-if="editing" icon="pi pi-save" label="Save" severity="success" @click="editing = !editing" />
        <BeatVisualizer />
      </div>
    </template>

    <div v-if="!editing" class="grid grid-cols-1 md:grid-cols-8 gap-5">
      <Button
        v-for="button in store.buttonEffects"
        :key="button.buttonId"
        class="h-14"
        :disabled="button.properties.type === 'LightsButtonNull'"
        raised
        :severity="buttonActive(button) ? 'primary' : 'secondary'"
        @pointercancel="
          () => {
            store.onEffectButtonCancel(button);
          }
        "
        @pointerdown="
          () => {
            store.onEffectButtonPress(button);
          }
        "
        @pointerup="
          () => {
            store.onEffectButtonRelease(button);
          }
        "
      >
        <EffectControllerButtonContent :button="button" :editing="editing" />
      </Button>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-8 gap-5">
      <Button
        v-for="button in store.buttonEffects"
        :key="button.buttonId"
        class="h-14"
        raised
        severity="secondary"
        variant="outlined"
        @click="
          () => {
            editingButton = button;
            editingDialogOpen = true;
          }
        "
      >
        <EffectControllerButtonContent :button="button" :editing="editing" />
      </Button>

      <EffectControllerButtonDialog
        :button="editingButton"
        :visible="editingDialogOpen"
        @close="editingDialogOpen = false"
      />
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BeatVisualizer from '@/components/audio/BeatVisualizer.vue';
import AppContainer from '@/layout/AppContainer.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';
import EffectControllerButtonDialog from '@/components/lights/effects/EffectControllerButtonDialog.vue';
import { type LightsButtonSwitch, type LightsPredefinedEffectResponse } from '@/api';
import EffectControllerButtonContent from '@/components/lights/effects/EffectControllerButtonContent.vue';

const store = useEffectsControllerStore();

const editing = ref(false);
const editingButton = ref<LightsPredefinedEffectResponse>();
const editingDialogOpen = ref(false);

const buttonActive = (button: LightsPredefinedEffectResponse) => {
  if (button.properties.type === 'LightsButtonColors') {
    return store.areSelectedColors(button.properties.colors);
  }
  if (button.properties.type === 'LightsButtonSwitch') {
    const storedSwitches = store.lightsSwitches.filter((s) =>
      (button.properties as LightsButtonSwitch).switchIds.includes(s.id),
    );
    const enabledSwitches = storedSwitches.filter((s) => s.enabled);
    return enabledSwitches.length > 0;
  }
  return false;
};
</script>

<style scoped></style>
