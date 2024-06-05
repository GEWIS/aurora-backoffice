<template>
  <ConfirmDialog />
  <Button size="small" severity="danger" title="Delete scene" @click="openDialog()">
    <FontAwesomeIcon :icon="faTrash" />
  </Button>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useSceneControllerStore } from '@/stores/scene-controller.store';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  id: number;
}>();

const store = useSceneControllerStore();

const confirm = useConfirm();
const openDialog = () => {
  confirm.require({
    message: 'Are you sure you want to delete this scene?',
    header: 'Are you sure?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Yes',
    accept() {
      store.deleteScene(props.id);
    }
  });
};
</script>

<style scoped></style>
