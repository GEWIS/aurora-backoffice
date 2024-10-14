<template>
  <AppContainer title="Centurion" icon="pi-crown">
    <template #header>
      <div v-if="currentTape">
        <StopButton :tape="currentTape" />
      </div>
    </template>
    <div class="grid grid-cols-1">
      <div v-if="currentTape">
        <CoverPlayButton :tape="currentTape" />
        <divider />
        <CenturionTapeTimeline :tape="currentTape" />
      </div>
      <div v-else>
        <InitializeCenturion :vertical="width < 768" />
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import InitializeCenturion from '@/components/modes/centurion/InitializeCenturion.vue';
import CoverPlayButton from '@/components/modes/centurion/CoverPlayButton.vue';
import AppContainer from '@/layout/AppContainer.vue';
import type { MixTapeResponse } from '@/api';
import StopButton from '@/components/modes/centurion/StopButton.vue';
import CenturionTapeTimeline from '@/components/modes/centurion/TapeTimeline.vue';

const centurionStore = useCenturionStore();
centurionStore.init();

const onWidthChange = () => (width.value = window.innerWidth);
onMounted(() => window.addEventListener('resize', onWidthChange));
onUnmounted(() => {
  window.removeEventListener('resize', onWidthChange);
  centurionStore.destroy();
});

let width = ref(window.innerWidth);
const currentTape = computed<MixTapeResponse | undefined>(() => {
  const tapes = centurionStore.getTapes;
  if (!tapes) return undefined;

  const currentTape = centurionStore.getCurrentTape;
  if (!currentTape) return undefined;

  return tapes?.find((t) => t.name === currentTape?.name);
});
</script>
