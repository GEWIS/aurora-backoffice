<template>
  <div class="flex justify-content-center align-items-center gap-4">
    <template v-if="!store.loading && !!tape">
      <img :src="tape.coverUrl" style="height: 120px; border-radius: 5px" :alt="tape.name" />
      <div class="flex flex-column gap-2">
        <h3 class="m-0 p-0">{{ tape.name }}</h3>
        <div class="flex flex-row justify-content-center">
          <Button
            size="small"
            outlined
            title="Play"
            @click="
              async () => {
                loading = true;
                await store.startCenturion();
                loading = false;
              }
            "
            :loading="loading"
          >
            <FontAwesomeIcon :icon="faPlay" />
          </Button>
          <Button
            size="small"
            outlined
            title="Pause"
            @click="
              async () => {
                loading = true;
                await store.pauseCenturion();
                loading = false;
              }
            "
            :loading="loading"
          >
            <FontAwesomeIcon :icon="faPause" />
          </Button>
        </div>
      </div>
    </template>
    <template v-else>
      <Skeleton width="120px" height="120px" />
      <div class="flex flex-column gap-2 justify-content-center">
        <Skeleton width="16rem" />
        <Skeleton width="5rem" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import type { MixTapeResponse } from '@/api/Client';
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { ref } from 'vue';

const store = useCenturionStore();

const loading = ref(false);

defineProps<{
  tape?: MixTapeResponse;
}>();
</script>

<style scoped></style>
