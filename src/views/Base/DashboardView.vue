<template>
  <h1>Hello, {{ authStore.name }}</h1>
  <div class="grid nested-grid">
    <div class="xl:col-6 col-12">
      <div class="grid">
        <div class="col-12">
          <ScreenHandlerBlock />
        </div>
        <div class="col-12">
          <AudioHandlerBlock />
        </div>
        <div class="col-12">
          <LightHandlerBlock />
        </div>
      </div>
    </div>
    <div class="xl:col-6 col-12">
      <div class="grid">
        <div class="col-12">
          <ShortcutBlock />
        </div>
        <div class="col-12">
          <AuditBlock />
        </div>
      </div>
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

const authStore = useAuthStore();
</script>

<style scoped lang="scss"></style>
