<template>
  <div class="w-full flex justify-between gap-2">
    <div>
      <i :class="['pi text-sm mr-2', icon]" />
      <span>{{ label }}</span>
    </div>
    <div>
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
