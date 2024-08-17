<template>
  <Card>
    <template #title>
      <div class="flex justify-content-between mb-4">
        <h4 class="uppercase mb-0">
          <i :class="['pi mr-3', icon]" style="font-size: 1.25rem"></i>{{ title }}
        </h4>
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
  title: String,
  icon: String
});
</script>

<style scoped></style>
