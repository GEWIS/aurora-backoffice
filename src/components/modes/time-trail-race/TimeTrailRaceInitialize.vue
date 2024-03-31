<template>
  <Panel header="Spoelbakkenrace" action="Start">
    <template #default>
      <div class="flex flex-column gap-4">
        <div class="flex flex-column gap-2">
          <label for="time-trail-race-session-name">Session name</label>
          <InputText id="time-trail-race-session-name" v-model="sessionName" />
        </div>
        <SubscribersSelect
          :selected-audios="selectedAudios"
          :selected-screens="selectedScreens"
          :selected-light-groups="selectedLightGroups"
          @update:audios="(ids: number[]) => (selectedAudios = ids)"
          @update:screens="(ids: number[]) => (selectedScreens = ids)"
          @update:light-groups="(ids: number[]) => (selectedLightGroups = ids)"
        />
      </div>
    </template>
    <template #footer>
      <div class="text-right">
        <Button size="small" :disabled="!canOpenConfirmModal" @click="confirmModalOpen = true">
          Initialize
        </Button>
        <ModeConfirmDialog
          :selected-audios="selectedAudios"
          :visible="confirmModalOpen"
          :selected-light-groups="selectedLightGroups"
          :selected-screens="selectedScreens"
          :loading="confirmModalLoading"
          @close="confirmModalOpen = false"
          @ok="initialize()"
        >
          <div>Are you sure you want to start a Spoelbakkenrace for "{{ sessionName }}"?</div>
        </ModeConfirmDialog>
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import SubscribersSelect from '@/components/modes/SubscribersSelect.vue';
import { computed, ref } from 'vue';
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import ModeConfirmDialog from '@/components/modes/ModeConfirmDialog.vue';

const store = useTimeTrailRaceStore();

const sessionName = ref<string>('');
const selectedAudios = ref<number[]>([]);
const selectedScreens = ref<number[]>([]);
const selectedLightGroups = ref<number[]>([]);

const confirmModalOpen = ref<boolean>(false);
const confirmModalLoading = ref<boolean>(false);
const canOpenConfirmModal = computed(() => {
  return sessionName.value.length > 0;
});

const initialize = async () => {
  confirmModalLoading.value = true;
  await store.initializeTimeTrailMode(
    sessionName.value,
    selectedAudios.value,
    selectedScreens.value,
    selectedLightGroups.value
  );
  confirmModalOpen.value = false;
  confirmModalLoading.value = false;
};
</script>

<style scoped></style>
