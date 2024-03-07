<template>
  <div class="flex flex-row gap-1 align-items-center">
    <FontAwesomeIcon :icon="faMusic" />
    <div>[{{ formatDuration(song.timestamp) }}]</div>
    <div>
      <div v-for="track in tracks" :key="track.title">{{ track.artist }} - {{ track.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
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
