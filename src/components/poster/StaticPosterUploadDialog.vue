<template>
  <Button icon="pi pi-plus" label="Add poster" @click="visible = true" />
  <Dialog
    closable
    close-on-escape
    dismissable-mask
    header="Add poster"
    :keep-in-viewport="false"
    modal
    :visible="visible"
    @update:visible="(v) => (visible = v)"
  >
    <div class="flex flex-col">
      <StaticPosterUploadUrl @close="visible = false" />
      <Divider align="center">or</Divider>
      <StaticPosterUploadFile @close="visible = false" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StaticPosterUploadUrl from '@/components/poster/StaticPosterUploadUrl.vue';
import StaticPosterUploadFile from '@/components/poster/StaticPosterUploadFile.vue';

const visible = ref<boolean>(false);
</script>

<style scoped></style>
