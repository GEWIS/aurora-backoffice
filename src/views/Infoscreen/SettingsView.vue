<template>
  <AppContainer title="Settings" icon="pi-cog">
    <div class="grid">
      <div class="col-4">
        <TimeSettings />
      </div>
      <div class="col-4">
        <RoomResponsibleSettings />
      </div>
      <div class="col-4">
        <EROSettings />
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import TimeSettings from '@/components/infoscreen/TimeSettings.vue';
import RoomResponsibleSettings from '@/components/infoscreen/RoomResponsibleSettings.vue';
import EROSettings from '@/components/infoscreen/EROSettings.vue';
import AppContainer from '@/layout/AppContainer.vue';
</script>

<style scoped></style>
