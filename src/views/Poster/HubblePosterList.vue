<template>
  <BasePosterList :poster-store="store" title="Hubble Posters" />
</template>

<script setup lang="ts">
import { useHubblePosterStore } from '@/stores/poster/hubble-poster-store';
import BasePosterList from '@/views/Poster/BasePosterList.vue';

const store = useHubblePosterStore();
store.init();
</script>

<style scoped></style>
