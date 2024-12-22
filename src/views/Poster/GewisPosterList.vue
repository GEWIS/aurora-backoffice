<template>
  <BasePosterList :poster-store="store" title="GEWIS Posters" />
</template>

<script setup lang="ts">
import { useGewisPosterStore } from '@/stores/poster/gewis-poster-store';
import BasePosterList from '@/views/Poster/BasePosterList.vue';

const store = useGewisPosterStore();
store.init();
</script>

<style scoped></style>
