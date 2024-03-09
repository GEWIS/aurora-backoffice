<template>
  <div class="page-container">
    <div class="page-title">Settings</div>
    <div class="flex flex-column gap-5">
      <div class="flex justify-content-between">
        <div style="width: 30%">
          <TimeSettings />
        </div>
        <div style="width: 30%">
          <RoomResponsibleSettings />
        </div>
        <div style="width: 30%">
          <EROSettings />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimeSettings from '@/components/Infoscreen/TimeSettings.vue';
import RoomResponsibleSettings from '@/components/Infoscreen/RoomResponsibleSettings.vue';
import EROSettings from '@/components/Infoscreen/EROSettings.vue';
</script>

<style scoped>
@import '@/styles/BasePage.scss';
</style>
