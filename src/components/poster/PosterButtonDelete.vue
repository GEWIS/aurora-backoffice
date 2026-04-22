<template>
  <Button class="flex-1" icon="pi pi-trash" severity="danger" @click="confirmRef?.confirmDialog" />
  <ConfirmWrapper
    ref="confirmRef"
    accept-label="Delete"
    :loading="loading"
    message="Are you sure you want to delete this poster?"
    :on-accept="
      async () => {
        loading = true;
        await store.deletePoster(props.poster.id);
        loading = false;
      }
    "
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ConfirmWrapper from '@/components/prime/ConfirmWrapper.vue';
import type { LocalPosterResponse } from '@/api';
import { usePosterStore } from '@/stores/poster/poster.store';

const store = usePosterStore();

const props = defineProps<{
  poster: LocalPosterResponse;
}>();

const confirmRef = ref();
const loading = ref<boolean>(false);
</script>

<style scoped></style>
