<template>
  <TopNavbar />
  <RouterView />
  <CopyrightBanner />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import CopyrightBanner from '@/layout/CopyrightBanner.vue';
import TopNavbar from '@/layout/TopNavbar.vue';
</script>

<style scoped></style>
