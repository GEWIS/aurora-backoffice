<template>
  <AppContainer title="Centurion Mode" icon="pi-crown">
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-5">
        <CenturionTapeSelect />
      </div>
      <div class="col-12 md:col-6 lg:col-7">
        <CenturionTapeActive />
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { onUnmounted } from 'vue';
import CenturionTapeSelect from '@/components/modes/centurion/CenturionTapeSelect.vue';
import CenturionTapeActive from '@/components/modes/centurion/CenturionTapeActive.vue';
import AppContainer from '@/layout/AppContainer.vue';

const store = useCenturionStore();
store.init();

onUnmounted(() => {
  store.destroy();
});
</script>

<style scoped></style>
