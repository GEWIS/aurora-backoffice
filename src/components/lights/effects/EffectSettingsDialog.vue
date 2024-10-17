<script setup lang="ts">
import { ref } from 'vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';

defineProps<{
  effectName: string;
  canSave: boolean;
  disabled?: boolean;
}>();
defineEmits<{
  save: [];
}>();

const store = useEffectsControllerStore();
const visible = ref<boolean>(false);
</script>

<template>
  <Button
    :label="effectName"
    icon="pi pi-plus"
    severity="success"
    :disabled="store.selectedLightsGroupIds.length === 0"
    @click="() => (visible = true)"
  />

  <Dialog
    v-model:visible="visible"
    modal
    :header="effectName"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    dismissable-mask
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
