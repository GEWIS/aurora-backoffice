<template>
  <Panel header="Currently active tape">
    <template #default>
      <div v-if="store.loading || (!!store.currentTape && !!currentTape)" class="flex flex-column gap-3">
        <CenturionTapeOperations :tape="currentTape" />
        <Divider />
        <CenturionTapeTimeline :tape="currentTape" />
      </div>
      <div v-else>
        <span class="font-italic">Centurion is currently not active.</span>
      </div>
    </template>
    <template #icons>
      <CenturionQuitButton />
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import CenturionTapeTimeline from '@/components/modes/centurion/CenturionTapeTimeline.vue';
import CenturionTapeOperations from '@/components/modes/centurion/CenturionTapeOperations.vue';
import { computed, type ComputedRef } from 'vue';
import { MixTapeResponse } from '@/api/Client';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CenturionQuitButton from '@/components/modes/centurion/CenturionQuitButton.vue';

const store = useCenturionStore();

const currentTape: ComputedRef<MixTapeResponse | undefined> = computed<MixTapeResponse | undefined>(() => {
  const { tapes, currentTape } = store;
  return tapes?.find((t) => t.name === currentTape?.name);
});

</script>

<style scoped>

</style>
