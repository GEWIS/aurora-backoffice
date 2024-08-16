<template>
  <Button
    size="small"
    variant="danger"
    title="Stop"
    @click="confirmDelete()"
    style="margin: -0.6rem"
    :loading="store.loading"
  >
    <i class="pi pi-trash" />
  </Button>

  <ConfirmDialog />
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { useConfirm } from 'primevue/useconfirm';

const store = useCenturionStore();

const confirm = useConfirm();
const confirmDelete = () => {
  confirm.require({
    message: 'Are you sure you want to quit this centurion?',
    header: 'Are you sure?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Yes',
    accept() {
      store.quitCenturion();
    }
  });
};
</script>

<style scoped></style>
