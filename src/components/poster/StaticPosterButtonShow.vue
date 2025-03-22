<template>
  <Button class="flex-1" icon="pi pi-eye" label="Show" :loading="loading" severity="success" @click="handleShow" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStaticPosterStore } from '@/stores/poster/static-poster.store';
import type { LocalPosterResponse } from '@/api';

const store = useStaticPosterStore();

const loading = ref<boolean>(false);
const props = defineProps<{
  poster: LocalPosterResponse;
}>();

const handleShow = () => {
  loading.value = true;
  store.setActivePoster(props.poster.id).finally(() => {
    loading.value = false;
  });
};
</script>

<style scoped></style>
