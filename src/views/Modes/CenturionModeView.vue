<template>
  <div class="grid lg:grid-cols-6 xxl:grid-cols-4">
    <div class="hidden lg:flex" />
    <AppContainer title="Centurion" icon="pi-crown" class="lg:col-span-4 xxl:col-span-2">
      <template #header>
        <div v-if="currentTape">
          <StopButton :tape="currentTape" />
        </div>
      </template>
      <div v-if="currentTape">
        <CoverPlayButton :tape="currentTape" />
        <divider />
        <CenturionTapeTimeline :tape="currentTape" />
      </div>
      <div v-else>
        <InitializeCenturion :vertical="layoutStore.getWindowWidth < TailwindWidth.sm" />
      </div>
    </AppContainer>
  </div>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { computed, onMounted, onUnmounted } from 'vue';
import InitializeCenturion from '@/components/modes/centurion/InitializeCenturion.vue';
import CoverPlayButton from '@/components/modes/centurion/CoverPlayButton.vue';
import AppContainer from '@/layout/AppContainer.vue';
import type { MixTapeResponse } from '@/api';
import StopButton from '@/components/modes/centurion/StopButton.vue';
import CenturionTapeTimeline from '@/components/modes/centurion/TapeTimeline.vue';
import { useLayoutStore, TailwindWidth } from '@/stores/layout.store';

const centurionStore = useCenturionStore();
const layoutStore = useLayoutStore();
centurionStore.init();

onMounted(() => layoutStore.mountResizeListener());
onUnmounted(() => {
  layoutStore.unmountResizeListener();
  centurionStore.destroy();
});

// let width = ref(window.innerWidth);
const currentTape = computed<MixTapeResponse | undefined>(() => {
  const tapes = centurionStore.getTapes;
  if (!tapes) return undefined;

  const currentTape = centurionStore.getCurrentTape;
  if (!currentTape) return undefined;

  return tapes?.find((t) => t.name === currentTape?.name);
});
</script>
