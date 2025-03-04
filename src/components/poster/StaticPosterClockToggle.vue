<template>
  <div class="flex flex-row gap-2 justify-center items-center">
    <label for="static-poster-clock-toggle">Clock</label>
    <ToggleSwitch
      id="static-poster-clock-toggle"
      :disabled="loading"
      :model-value="store.clockVisible"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStaticPosterStore } from '@/stores/poster/static-poster.store';

const store = useStaticPosterStore();

const loading = ref<boolean>(false);

const handleClick = async () => {
  loading.value = true;
  await store.setClockVisibility(!store.clockVisible);
  loading.value = false;
};
</script>

<style scoped></style>
