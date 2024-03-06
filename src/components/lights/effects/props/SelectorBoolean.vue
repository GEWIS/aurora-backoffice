<template>
  <div>
    <div @click="$emit('click')" class="w-fit">
      <Checkbox :id="id" :name="id" binary :value="checked" :modelValue="checked" />
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
