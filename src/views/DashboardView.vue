<template>
  <h1>Hello, {{ authStore.name }}</h1>
  <div class="grid">
    <div class="col-12 xl:col-4">
      <ScreenHandlerBlock />
    </div>
    <div class="col-12 xl:col-4">
      <AudioHandlerBlock />
    </div>
    <div class="col-12 xl:col-4">
      <LightHandlerBlock />
    </div>
    <div class="col-12 md:col-6 lg:col-4">
      <ShortcutBlock />
    </div>
    <div class="col-12">
      <AuditLogs />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import ShortcutBlock from '@/components/shortcuts/ShortcutBlock.vue';
import AuditLogs from '@/components/audit/AuditLogs.vue';
import ScreenHandlerBlock from '@/components/handlers/ScreenHandlerBlock.vue';
import AudioHandlerBlock from '@/components/handlers/AudioHandlerBlock.vue';
import LightHandlerBlock from '@/components/handlers/LightHandlerBlock.vue';

const authStore = useAuthStore();
</script>

<style scoped lang="scss"></style>
