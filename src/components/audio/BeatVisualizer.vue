<template>
  <div class="flex flex-row gap-1 beat-visualizer">
    <i :class="store.beat ? 'pi pi-circle' : 'pi pi-circle-fill'" />
    <i :class="store.beat ? 'pi pi-circle-fill' : 'pi pi-circle'" />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useMusicBeatStore } from '@/stores/socket/music-beat.store';

const store = useMusicBeatStore();
store.initBeat();

onUnmounted(() => {
  store.destroyBeat();
});
</script>

<style scoped></style>
