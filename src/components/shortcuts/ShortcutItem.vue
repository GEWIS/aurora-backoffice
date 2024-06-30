<template>
  <div class="w-full flex flex-center gap-2">
    <span class="flex-1"><i :class="['pi text-sm mr-2', icon]"></i> {{ label }}</span>
    <div v-if="loading">
      <Spinner style="height: 1rem; width: 1rem" strokeWidth="8" />
    </div>
    <div v-if="enabled">
      <i class="pi pi-play-circle text-green-500"></i>
    </div>
    <div v-if="disabled">
      <i class="pi pi-times-circle text-red-500"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string;
  label?: string | ((...args: any) => string) | undefined;
  loading?: boolean | undefined;
  enabled?: boolean | undefined;
  disabled?: boolean | undefined;
}>();
</script>

<style scoped></style>
