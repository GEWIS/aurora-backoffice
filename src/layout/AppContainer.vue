<template>
  <Card>
    <template #title>
      <div class="flex justify-between mb-4 items-center">
        <div class="uppercase mb-0"><i :class="['pi mr-3', icon]" style="font-size: 1.25rem" />{{ title }}</div>
        <slot name="header" />
      </div>
    </template>
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
});
</script>

<style scoped></style>
