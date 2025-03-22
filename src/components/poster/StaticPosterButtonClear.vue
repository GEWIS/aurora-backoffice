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
import { useStaticPosterStore } from '@/stores/poster/static-poster.store';

const store = useStaticPosterStore();

const loading = ref<boolean>(false);

const handleClick = async () => {
  loading.value = true;
  await store.clearActivePoster();
  loading.value = false;
};
</script>

<style scoped></style>
