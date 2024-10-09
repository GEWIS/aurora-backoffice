<template>
  <Panel :header="lightGroups.map((g) => g?.name).join(', ')" @click="setEffect()">
    <div class="flex flex-column gap-2 justify-content-start">
      <div class="font-italic"><timeago :datetime="effect.timestamp" :auto-update="5" /></div>
      <div>
        <SavedEffect v-if="effect.colorEffect !== undefined" :effect="effect.colorEffect" />
        <SavedEffect v-if="effect.movementEffect !== undefined" :effect="effect.movementEffect" />
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { type PushedEffect, useEffectsControllerStore } from '@/stores/effects-controller.store';
import { useHandlersStore } from '@/stores/handlers.store';
import SavedEffect from '@/components/lights/effects/SavedEffect.vue';

const props = defineProps<{
  effect: PushedEffect;
}>();

const store = useHandlersStore();
const lightGroups = props.effect.lightGroupIds.map((id: number) =>
  store.getRegisteredLights().find((g) => g.id === id)
);
const effectsControllerStore = useEffectsControllerStore();

const setEffect = () => {
  if (props.effect.colorEffect !== undefined) {
    effectsControllerStore.setColorEffect(props.effect.colorEffect, props.effect.lightGroupIds);
  }
  if (props.effect.movementEffect !== undefined) {
    effectsControllerStore.setMovementEffect(
      props.effect.movementEffect,
      props.effect.lightGroupIds
    );
  }
};
</script>

<style scoped>
.p-card-body {
  padding: 0.5rem !important;
}
</style>
