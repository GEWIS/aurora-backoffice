<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  effectName: string;
  canSave: boolean;
}>();
defineEmits<{
  save: [];
}>();

const visible: boolean = ref(false);
</script>

<template>
  <Button
    :label="effectName"
    icon="pi pi-plus"
    @click="() => (visible = true)"
    severity="success"
  />

  <Dialog
    v-model:visible="visible"
    modal
    :header="effectName"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    dismissableMask
  >
    <div class="flex flex-column w-100 gap-3">
      <slot></slot>
    </div>
    <template #footer>
      <Button
        severity="success"
        :disabled="!canSave"
        @click="
          () => {
            visible = false;
            $emit('save');
          }
        "
        >Add</Button
      >
    </template>
  </Dialog>
</template>

<style scoped></style>
