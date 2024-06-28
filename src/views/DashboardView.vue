<template>
  <div class="page-container">
    <div class="page-title">Hello, {{ authStore.name }}.</div>
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-4">
        <SubscribersOverview />
      </div>
      <div class="col-12 md:col-6 lg:col-4">
        <DashboardShortcuts />
      </div>
      <div class="col-12">
        <DashboardAuditLogs />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SubscribersOverview from '@/components/home/SubscribersOverview.vue';
import { useAuthStore } from '@/stores/auth.store';
import DashboardShortcuts from '@/components/home/DashboardShortcuts.vue';
import DashboardAuditLogs from '@/components/home/DashboardAuditLogs.vue';

const authStore = useAuthStore();
</script>

<style scoped lang="scss"></style>
