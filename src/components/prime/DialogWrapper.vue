<template>
  <div class="flex flex-row gap-3">
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';

const props = defineProps<{
  message: string;
  loading?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
}>();

const confirm = useConfirm();
const confirmDelete = () => {
  confirm.require({
    message: props.message,
    header: 'Confirm',
    rejectClass: 'p-button-secondary',
    rejectLabel: 'Cancel',
    acceptLabel: 'Quit',
    reject() {
      if (props.onReject) {
        props.onReject();
      }
    },
    accept() {
      if (props.onAccept) {
        props.onAccept();
      }
    }
  });
};

defineExpose({
  confirmDelete
});
</script>
