<template>
  <div class="flex flex-row gap-1 align-items-center">
    <i class="pi pi-headphones" />
    <div>[{{ formatDuration(song.timestamp) }}]</div>
    <div>
      <div v-for="track in tracks" :key="track.title">{{ track.artist }} - {{ track.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDuration } from '../../../utils/formatterUtils';
import type { SongData, SongEvent } from '@/api';

const props = defineProps<{
  song: SongEvent;
}>();

const tracks = computed<SongData[]>(() => {
  const tracks = props.song.data as SongData | SongData[];
  if (Array.isArray(tracks)) return tracks;
  return [tracks];
});
</script>

<style scoped></style>
