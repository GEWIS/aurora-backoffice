<template>
  <input
    id="static-poster-file-upload"
    ref="fileSelector"
    accept="image/*, video/*"
    hidden
    type="file"
    @change="handleFileSelect"
  />
  <Button icon="pi pi-plus" label="Upload file" :loading="loading" @click="fileSelector?.click()" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStaticPosterStore } from '@/stores/poster/static-poster.store';

const store = useStaticPosterStore();

const emit = defineEmits<{
  close: [];
}>();

const fileSelector = ref();
const loading = ref<boolean>(false);

const handleFileSelect = async (event: Event) => {
  if (event.target && 'files' in event.target && Array.isArray(event.target.files) && event.target.files[0]) {
    loading.value = true;
    await store.addPosterFile(event.target.files[0]);
    emit('close');
    loading.value = false;
  }
};
</script>

<style scoped></style>
