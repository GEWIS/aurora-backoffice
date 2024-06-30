<template>
  <Panel class="w-full">
    <template #header>
      <div class="p-panel-title uppercase">
        <FontAwesomeIcon
          :icon="faSpotify"
          class="mr-1 text-xl"
          :style="{ marginTop: '-0.25rem', marginBottom: '-0.15rem' }"
        />
        Currently Playing
      </div>
    </template>
    <template #default>
      <div v-if="store.currentlyPlaying != null" class="flex gap-2">
        <div :style="{ width: '60px' }">
          <img
            :src="store.currentlyPlaying.cover"
            :style="{ width: '100%', borderRadius: '5px' }"
          />
        </div>
        <div class="flex flex-column gap-1 h-100 justify-content-center">
          <span>{{ store.currentlyPlaying.title }}</span>
          <span class="text-sm">{{ store.currentlyPlaying.artists.join(', ') }}</span>
        </div>
      </div>
      <div v-else>
        <span class="font-italic">Nothing playing on Spotify at the moment</span>
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { useCurrentlyPlayingStore } from '@/stores/socket/currently-playing.store';
import { onUnmounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const store = useCurrentlyPlayingStore();
store.init();

onUnmounted(() => {
  store.destroy();
});
</script>

<style scoped></style>
