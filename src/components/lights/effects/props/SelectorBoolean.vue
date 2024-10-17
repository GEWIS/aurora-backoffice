<template>
  <div>
    <div class="w-fit" @click="$emit('click')">
      <Checkbox :id="id" :name="id" binary :value="checked" :model-value="checked" />
      <label :for="id" class="ml-2">{{ name }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  checked: boolean;
  name: string;
  id: string;
}>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  click: [];
}>();
</script>

<style scoped></style>
