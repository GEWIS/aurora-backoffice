<template>
  <div class="flex flex-row gap-10 justify-between">
    <h1>Hello, {{ authStore.name }}</h1>
    <DevGuard>
      <DevSettings />
    </DevGuard>
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-10">
    <div class="flex flex-col gap-10">
      <ScreenHandlerBlock />
      <AudioHandlerBlock />
      <LightHandlerBlock />
    </div>
    <div class="flex flex-col gap-10">
      <ShortcutBlock />
      <AuditBlock />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import ShortcutBlock from '@/components/shortcuts/ShortcutBlock.vue';
import AuditBlock from '@/components/audit/AuditBlock.vue';
import ScreenHandlerBlock from '@/components/handlers/ScreenHandlerBlock.vue';
import AudioHandlerBlock from '@/components/handlers/AudioHandlerBlock.vue';
import LightHandlerBlock from '@/components/handlers/LightHandlerBlock.vue';
import DevSettings from '@/components/devops/DevSettings.vue';
import DevGuard from '@/components/devops/DevGuard.vue';

const authStore = useAuthStore();
</script>
