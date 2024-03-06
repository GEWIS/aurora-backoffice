<template>
  <div class="flex flex-row gap-1 beat-visualizer">
    <i :class="store.beat ? 'pi pi-circle' : 'pi pi-circle-fill'" />
    <i :class="store.beat ? 'pi pi-circle-fill' : 'pi pi-circle'" />
  </div>
</template>

<script setup lang="ts">
import { useMusicBeatStore } from '@/stores/socket/music-beat.store';
import { onUnmounted } from 'vue';

const store = useMusicBeatStore();
store.init();

onUnmounted(() => {
  store.destroy();
});
</script>

<style scoped></style>
