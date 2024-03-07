<template>
  <Dialog
    modal
    header="Initialize Centurion"
    :visible="visible"
    @update:visible="$emit('close')"
    dismissable-mask
    :draggable="false"
  >
    <template #default>
      <div class="flex flex-column gap-3">
        <div>Are you sure you want to initialize the mix tape "{{ selectedTape.name }}"?</div>
        <div>
          <span>The following listeners will be used to enable this mode:</span>
          <div class="flex flex-row gap-2">
            <div class="flex flex-1 flex-column text-center gap-1">
              <h4 class="mb-1">Audio players</h4>
              <template v-if="audios.length > 0">
                <span v-for="audio in audios" :key="audio.id">{{ audio.name }}</span>
              </template>
              <template v-else>
                <div class="font-italic">No audio players selected.</div>
              </template>
            </div>
            <div class="flex flex-1 flex-column text-center gap-1">
              <h4 class="mb-1">Screens</h4>
              <template v-if="screens.length > 0">
                <div v-for="screen in screens" :key="screen.id">{{ screen.name }}</div>
              </template>
              <template v-else>
                <span class="font-italic">No screens selected.</span>
              </template>
            </div>
            <div class="flex flex-1 flex-column text-center gap-1">
              <h4 class="mb-1">Lights groups</h4>
              <template v-if="lightGroups.length > 0">
                <div v-for="lightsGroup in lightGroups" :key="lightsGroup.id">
                  {{ lightsGroup.name }}
                </div>
              </template>
              <template v-else>
                <span class="font-italic">No lights groups selected.</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row gap-1 justify-content-end">
        <Button severity="secondary" size="small" @click="$emit('close')"> Cancel </Button>
        <Button size="small" @click="initialize()" :loading="loading"> Ok </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useSubscriberStore } from '@/stores/subscriber.store';
import { computed, ref } from 'vue';
import { useCenturionStore } from '@/stores/modes/centurion.store';
import type { MixTapeResponse } from '@/api';

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

const audios = computed(() => store.audios.filter((a) => props.selectedAudios.includes(a.id)));
const screens = computed(() => store.screens.filter((a) => props.selectedScreens.includes(a.id)));
const lightGroups = computed(() =>
  store.lightsGroups.filter((a) => props.selectedLightGroups.includes(a.id))
);

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
