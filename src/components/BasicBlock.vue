<template>
  <div class="card mb-0">
    <h4><i :class="['pi mr-3', icon]" style="font-size: 1.25rem"></i>{{ header }}</h4>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  header: String,
  icon: String
});
</script>

<style scoped></style>
