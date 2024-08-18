<template>
  <div class="flex flex-row gap-3">
    <Button
      size="small"
      variant="danger"
      title="Stop"
      @click="confirmDelete()"
      :loading="store.loading"
    >
      <i class="pi pi-times" />
    </Button>
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import type { MixTapeResponse } from '@/api';
import { useConfirm } from 'primevue/useconfirm';

defineProps<{
  tape?: MixTapeResponse;
}>();

const store = useCenturionStore();
const confirm = useConfirm();
const confirmDelete = () => {
  confirm.require({
    message: 'Do you want to quit this centurion?',
    header: 'Danger Zone',
    rejectClass: 'p-button-secondary',
    rejectLabel: 'Cancel',
    acceptLabel: 'Quit',
    accept() {
      store.quitCenturion();
    }
  });
};
</script>

<style scoped></style>
