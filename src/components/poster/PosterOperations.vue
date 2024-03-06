<template>
  <div class="flex flex-row gap-3">
    <Button
      label="Refresh"
      :loading="refreshLoading"
      @click="
        async () => {
          refreshLoading = true;
          await store.getPosters();
          refreshLoading = false;
        }
      "
    >
      <template #icon>
        <FontAwesomeIcon :icon="faRefresh" class="mr-2" />
      </template>
    </Button>
    <Button
      label="Force reload from source"
      :loading="updateLoading"
      @click="
        async () => {
          updateLoading = true;
          await store.reloadPosters();
          updateLoading = false;
        }
      "
    >
      <template #icon>
        <FontAwesomeIcon :icon="faDownload" class="mr-2" />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import { usePosterStore } from '@/stores/poster-store';

const store = usePosterStore();

const refreshLoading = ref(false);
const updateLoading = ref(false);
</script>

<style scoped></style>
