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
  if (!event.target) {
    console.error('No event target for file upload event', event);
    return;
  }
  if (!('files' in event.target)) {
    console.error('No files in file upload event target', event.target);
    return;
  }
  let file: File | undefined;
  if (Array.isArray(event.target.files) || event.target.files instanceof FileList) {
    file = (event.target.files as Array<File>)[0];
  } else {
    file = event.target.files as File;
  }
  if (!file) {
    console.warn('File not found in file upload event target', event.target.files);
    return;
  }

  loading.value = true;
  await store.addPosterFile(file);
  emit('close');
  loading.value = false;
};
</script>

<style scoped></style>
