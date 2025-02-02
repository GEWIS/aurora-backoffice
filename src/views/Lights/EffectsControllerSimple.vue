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
        severity="secondary"
        @blur="store.onEffectButtonRelease(button)"
        @mousedown="store.onEffectButtonPress(button)"
        @mouseleave="store.onEffectButtonRelease(button)"
        @mouseup="store.onEffectButtonRelease(button)"
        @touchend="store.onEffectButtonRelease(button)"
        @touchstart="store.onEffectButtonPress(button)"
      >
        <span v-if="button.icon" :class="['pi', button.icon]" />
        {{ button.name }}
      </Button>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-8 gap-5">
      <Button
        v-for="button in store.buttonEffects"
        :key="button.buttonId"
        class="h-14"
        severity="secondary"
        variant="outlined"
        @click="
          () => {
            editingButton = button;
            editingDialogOpen = true;
          }
        "
      >
        <span class="pi pi-pencil" />
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
import type { LightsPredefinedEffectResponse } from '@/api';

const store = useEffectsControllerStore();

const editing = ref(false);
const editingButton = ref<LightsPredefinedEffectResponse>();
const editingDialogOpen = ref(false);
</script>

<style scoped></style>
