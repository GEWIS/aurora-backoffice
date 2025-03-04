<template>
  <form class="flex flex-row gap-2">
    <InputText v-model="url" class="flex-1" :invalid="invalid" placeholder="https://..." type="url" />
    <Button :disabled="loading" label="Add URL" :loading="loading" type="submit" @click="onSave" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStaticPosterStore } from '@/stores/poster/static-poster.store';

const store = useStaticPosterStore();

const emit = defineEmits<{
  close: [];
}>();

const url = ref<string>('');
const loading = ref<boolean>(false);
const invalid = ref<boolean>(false);

const onSave = async (e: Event) => {
  e.preventDefault();
  try {
    const parsedUrl = new URL(url.value);
    loading.value = true;
    await store.addPosterUrl(parsedUrl.toString());
    emit('close');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    // URL is not valid
    invalid.value = true;
  }
  loading.value = false;
};
</script>

<style scoped></style>
