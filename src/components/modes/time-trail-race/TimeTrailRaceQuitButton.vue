<template>
  <Button
    size="small"
    variant="danger"
    title="Stop"
    @click="confirmDelete()"
    :loading="store.loading"
    :disabled="!store.sessionName || !store.state"
  >
    <FontAwesomeIcon :icon="faTrash" />
  </Button>

  <ConfirmDialog />
</template>

<script setup lang="ts">
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useConfirm } from 'primevue/useconfirm';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
