<template>
  <Button class="flex-1" icon="pi pi-trash" severity="danger" @click="confirmRef?.confirmDialog" />
  <ConfirmWrapper
    ref="confirmRef"
    :loading="loading"
    message="Are you sure you want to delete this poster?"
    acceptLabel="Delete"
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
import { useStaticPosterStore } from '@/stores/poster/static-poster.store';
import type { LocalPosterResponse } from '@/api';

const store = useStaticPosterStore();

const props = defineProps<{
  poster: LocalPosterResponse;
}>();

const confirmRef = ref();
const loading = ref<boolean>(false);
</script>

<style scoped></style>
