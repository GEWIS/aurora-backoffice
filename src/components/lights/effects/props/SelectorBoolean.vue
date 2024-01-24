<template>
  <div>
    <div @click="$emit('click')" class="w-fit">
      <Checkbox :id="id" :name="id" binary :value="checked" :modelValue="checked" />
      <label :for="id" class="ml-2">{{ name }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  checked: boolean;
  name: string;
  id: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<style scoped></style>
