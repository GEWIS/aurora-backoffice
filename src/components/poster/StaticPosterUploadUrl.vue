<template>
  <form class="flex flex-row gap-2">
    <InputText v-model="url" class="flex-1" placeholder="https://..." type="url" />
    <Button label="Add URL" type="submit" @click="onSave" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  close: [];
}>();

const url = ref<string>();

const onSave = () => {
  emit('close');
};
</script>

<style scoped></style>
