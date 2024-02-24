<template>
  <div class="page-container">
    <div class="page-title">Centurion Mode</div>
    <div class="grid">
      <div class="sm:col-12 md:col-6 lg:col-4">
        <CenturionTapeSelect />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useCenturionStore } from '@/stores/modes/centurion.store';
import { onUnmounted } from 'vue';
import CenturionTapeSelect from '@/components/modes/centurion/CenturionTapeSelect.vue';

const store = useCenturionStore();
store.init();

onUnmounted(() => {
  store.destroy();
});

</script>

<style scoped>

</style>
