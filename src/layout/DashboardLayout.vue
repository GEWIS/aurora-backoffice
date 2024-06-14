<template>
  <TopNavbar />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopNavbar from '@/layout/TopNavbar.vue';
</script>

<style scoped></style>
