<template>
  <Button
    class="flex-1"
    :disabled="disabled"
    icon="pi pi-eye"
    label="Show"
    :loading="loading"
    severity="success"
    @click="handleShow"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { LocalPosterResponse } from '@/api';
import { usePosterStore } from '@/stores/poster/poster.store';

const store = usePosterStore();

const loading = ref<boolean>(false);
const props = withDefaults(
  defineProps<{
    poster: LocalPosterResponse;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

const handleShow = () => {
  loading.value = true;
  void store.setStaticActivePoster(props.poster.id).finally(() => {
    loading.value = false;
  });
};
</script>

<style scoped></style>
