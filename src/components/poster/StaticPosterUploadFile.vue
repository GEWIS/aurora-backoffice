<template>
  <FileUpload accept="image/*,video/*" auto class="w-full" custom-upload mode="basic" @select="onFileSelect" />
</template>

<script lang="ts" setup>
import type { FileUploadSelectEvent } from 'primevue';
import { ref } from 'vue';
import { useStaticPosterStore } from '@/stores/poster/static-poster.store';

const store = useStaticPosterStore();

const emit = defineEmits<{
  close: [];
}>();

const loading = ref<boolean>(false);

const onFileSelect = async (event: FileUploadSelectEvent) => {
  if (event.files.length > 0) {
    loading.value = true;
    await store.addPoster(event.files[0]);
    emit('close');
    loading.value = false;
  }
};
</script>

<style scoped></style>
