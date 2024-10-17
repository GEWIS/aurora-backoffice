<template>
  <Button
    size="small"
    variant="danger"
    title="Stop"
    :loading="store.loading"
    :disabled="!store.sessionName || !store.state"
    @click="confirmDelete()"
  >
    <i class="pi pi-trash" />
  </Button>

  <ConfirmDialog />
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';

const store = useTimeTrailRaceStore();

const confirm = useConfirm();
const confirmDelete = () => {
  confirm.require({
    message: 'Are you sure you want to quit this spoelbakkenrace?',
    header: 'Are you sure?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Yes',
    accept() {
      store.quit();
    }
  });
};
</script>

<style scoped></style>
