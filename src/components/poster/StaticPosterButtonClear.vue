<template>
  <Button
    icon="pi pi-times"
    label="Clear"
    :loading="loading"
    severity="secondary"
    title="Clear the currently active poster from screen"
    @click="handleClick()"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePosterStore } from '@/stores/poster/poster.store';

const store = usePosterStore();

const loading = ref<boolean>(false);

const handleClick = async () => {
  loading.value = true;
  await store.clearStaticActivePoster();
  loading.value = false;
};
</script>

<style scoped></style>
