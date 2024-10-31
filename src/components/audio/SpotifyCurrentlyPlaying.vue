<template>
  <Panel class="w-full">
    <template #header>
      <div class="p-panel-title uppercase">
        <i class="pi pi-headphones mr-1 text-xl" />
        Currently Playing
      </div>
    </template>
    <template #default>
      <div v-if="store.currentlyPlaying != null" class="flex gap-2">
        <div :style="{ width: '60px' }">
          <img
            :alt="store.currentlyPlaying.cover"
            :src="store.currentlyPlaying.cover"
            :style="{ width: '100%', borderRadius: '5px' }"
          />
        </div>
        <div class="flex flex-column gap-1 h-100 justify-content-center">
          <span>{{ store.currentlyPlaying?.title }}</span>
          <span class="text-sm">{{ store.currentlyPlaying?.artists.join(', ') }}</span>
        </div>
      </div>
      <div v-else>
        <span class="font-italic">Nothing playing on Spotify at the moment</span>
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useCurrentlyPlayingStore } from '@/stores/socket/currently-playing.store';

const store = useCurrentlyPlayingStore();
store.init();

onUnmounted(() => {
  store.destroy();
});
</script>

<style scoped></style>
