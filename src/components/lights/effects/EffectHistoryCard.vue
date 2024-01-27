<template>
  <Panel :header="lightGroups.map((g) => g?.name).join(', ')">
    <div class="p-2">
      Hello!
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { PushedEffects } from '@/stores/effects-controller.store';
import { useHandlersStore } from '@/stores/handlers.store';

const props = defineProps<{
  effect: PushedEffects;
}>();

const store = useHandlersStore();
const lightGroups = props.effect.lightGroupIds.map((id: number) => store
  .getRegisteredLights().find((g) => g.id === id));

</script>

<style scoped>
.p-card-body {
  padding: 0.5rem !important;
}
</style>
