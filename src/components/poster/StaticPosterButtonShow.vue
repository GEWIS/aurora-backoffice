<template>
  <Button class="flex-1" icon="pi pi-eye" label="Show" :loading="loading" severity="success" @click="handleShow" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { LocalPosterResponse } from '@/api';
import { usePosterStore } from '@/stores/poster/poster.store';

const store = usePosterStore();

const loading = ref<boolean>(false);
const props = defineProps<{
  poster: LocalPosterResponse;
}>();

const handleShow = () => {
  loading.value = true;
  void store.setStaticActivePoster(props.poster.id).finally(() => {
    loading.value = false;
  });
};
</script>

<style scoped></style>
