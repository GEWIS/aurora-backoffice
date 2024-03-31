<template>
  <ModeConfirmDialog
    :selected-audios="selectedAudios"
    :visible="visible"
    :selected-light-groups="selectedLightGroups"
    :selected-screens="selectedScreens"
    :loading="loading"
    @close="$emit('close')"
    @ok="initialize()"
  >
    <div>Are you sure you want to initialize the mix tape "{{ selectedTape.name }}"?</div>
  </ModeConfirmDialog>
</template>

<script setup lang="ts">
import { useSubscriberStore } from '@/stores/subscriber.store';
import { computed, ref } from 'vue';
import { useCenturionStore } from '@/stores/modes/centurion.store';
import type { MixTapeResponse } from '@/api';
import ModeConfirmDialog from '@/components/modes/ModeConfirmDialog.vue';

const store = useSubscriberStore();
const centurionStore = useCenturionStore();

const props = defineProps<{
  visible: boolean;
  selectedTape: MixTapeResponse;
  selectedAudios: number[];
  selectedScreens: number[];
  selectedLightGroups: number[];
}>();

const emit = defineEmits<{
  close: [];
}>();

const loading = ref(false);

const initialize = async () => {
  loading.value = true;
  await centurionStore.initializeCenturion(
    props.selectedTape.name,
    props.selectedAudios,
    props.selectedScreens,
    props.selectedLightGroups
  );
  emit('close');
  loading.value = false;
};
</script>

<style scoped></style>
