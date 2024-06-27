<template>
  <app-topbar></app-topbar>
  <div class="layout-sidebar">
    <app-sidebar></app-sidebar>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppTopbar from '@/layout/AppTopbar.vue';
import AppSidebar from '@/layout/AppSidebar.vue';
</script>

<style scoped></style>
