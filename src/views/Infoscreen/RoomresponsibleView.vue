<template>
  <div class="page-container">
    <div class="page-title">{{ $t('infoscreen.Room Responsibles') }}</div>
    <RoomResponsibleOverview/>
  </div>
  <CopyrightBanner/>
</template>

<script setup lang="ts">
import RoomResponsibleOverview from "@/components/Infoscreen/RoomResponsibleOverview.vue";
import CopyrightBanner from "@/layout/CopyrightBanner.vue";
</script>

<style scoped>
@import '@/styles/BasePage.scss';
</style>
