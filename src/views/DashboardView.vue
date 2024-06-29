<template>
  <h1>Hello, {{ authStore.name }}</h1>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <ScreenHandlerBlock />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <AudioHandlerBlock />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <LightHandlerBlock />
    </div>
    <!--    <div class="col-12 md:col-6 lg:col-4">-->
    <!--      <DashboardShortcuts />-->
    <!--    </div>-->
    <!--    <div class="col-12">-->
    <!--      <DashboardAuditLogs />-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
//import DashboardShortcuts from '@/components/home/DashboardShortcuts.vue';
//import DashboardAuditLogs from '@/components/home/DashboardAuditLogs.vue';
import ScreenHandlerBlock from '@/components/home/ScreenHandlerBlock.vue';
import AudioHandlerBlock from '@/components/home/AudioHandlerBlock.vue';
import LightHandlerBlock from '@/components/home/LightHandlerBlock.vue';

const authStore = useAuthStore();
</script>

<style scoped lang="scss"></style>
