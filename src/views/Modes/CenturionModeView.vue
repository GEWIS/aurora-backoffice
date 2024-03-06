<template>
  <div class="page-container">
    <div class="page-title">Centurion Mode</div>
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-5">
        <CenturionTapeSelect />
      </div>
      <div class="col-12 md:col-6 lg:col-7">
        <CenturionTapeActive />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { onUnmounted } from 'vue';
import CenturionTapeSelect from '@/components/modes/centurion/CenturionTapeSelect.vue';
import CenturionTapeActive from '@/components/modes/centurion/CenturionTapeActive.vue';

const store = useCenturionStore();
store.init();

onUnmounted(() => {
  store.destroy();
});
</script>

<style scoped></style>
