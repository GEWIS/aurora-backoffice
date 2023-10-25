<template>
  <div class="page-container">
    <div class="page-title">{{$t('infoscreen.settings')}}</div>
    <div class="flex flex-column gap-5">
      <div class="flex justify-content-between">
        <div style="width: 30%">
          <TimeSettings/>
        </div>
        <div style="width: 30%">
          <RoomResponsibleSettings/>
        </div>
        <div style="width: 30% ">
          <EROSettings/>
        </div>
      </div>
      <div>
        <MessageSettings/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimeSettings from "@/components/Infoscreen/TimeSettings.vue";
import RoomResponsibleSettings from "@/components/Infoscreen/RoomResponsibleSettings.vue";
import MessageSettings from "@/components/Infoscreen/MessageSettings.vue";
import EROSettings from "@/components/Infoscreen/EROSettings.vue";
</script>

<style scoped>
@import '@/styles/BasePage.css';
</style>
