<template>
  <Panel header="Currently active tape">
    <div v-if="store.loading || (!!store.currentTape && !!currentTape)" class="flex flex-column gap-3">
      <CenturionTapeOperations :tape="currentTape" />
      <Divider />
      <CenturionTapeTimeline :tape="currentTape" />
    </div>
    <div v-else>
      <span class="font-italic">Centurion is currently not active.</span>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import CenturionTapeTimeline from '@/components/modes/centurion/CenturionTapeTimeline.vue';
import CenturionTapeOperations from '@/components/modes/centurion/CenturionTapeOperations.vue';
import { computed, type ComputedRef } from 'vue';
import { MixTapeResponse } from '@/api/Client';

const store = useCenturionStore();

const currentTape: ComputedRef<MixTapeResponse | undefined> = computed<MixTapeResponse | undefined>(() => {
  const { tapes, currentTape } = store;
  return tapes?.find((t) => t.name === currentTape?.name);
});

</script>

<style scoped>

</style>
