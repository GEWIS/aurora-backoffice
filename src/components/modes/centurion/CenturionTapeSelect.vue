<template>
  <Panel header="Tapes" action="Start">
    <template v-if="!store.loading" #default>
      <div class="flex flex-column gap-4">
        <div>
          <Dropdown
            :modelValue="selectedTapeName"
            optionLabel="name"
            optionValue="name"
            :options="store.tapes"
            class="text-overflow-ellipsis full-width"
            placeholder="Choose a tape..."
            @update:modelValue="(value: string) => {
              console.log(value);
              selectedTapeName = value
            }"
            :title="selectedTapeName"
          />
        </div>
        <div>
          <SubscribersSelect
            :selected-audios="selectedAudios"
            :selected-screens="selectedScreens"
            :selected-light-groups="selectedLightGroups"
            @update:audios="(ids: number[]) => selectedAudios = ids"
            @update:screens="(ids: number[]) => selectedScreens = ids"
            @update:light-groups="(ids: number[]) => selectedLightGroups = ids"
          />
        </div>
        <div v-if="selectedTape != null">
          <CenturionTapeDetails :tape="selectedTape" />
        </div>
        <div v-else>
          <span class="font-italic">Select a tape to see its details...</span>
        </div>
      </div>
    </template>
    <template v-else #default>
      <div class="flex flex-column gap-4">
        <Skeleton class="w-full" />
        <Skeleton class="w-full" />
        <Skeleton class="w-full" />
        <Skeleton class="w-full" />
      </div>
    </template>
    <template #footer>
      <div class="text-right">
        <Button
          size="small"
          :disabled="!canOpenConfirmModal"
          @click="confirmModalOpen = true"
        >Initialize</Button>
        <CenturionInitializeDialog
          v-if="canOpenConfirmModal"
          :visible="confirmModalOpen"
          :selected-tape="selectedTape"
          :selected-audios="selectedAudios"
          :selected-light-groups="selectedLightGroups"
          :selected-screens="selectedScreens"
          @close="confirmModalOpen = false"
        />
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import CenturionTapeDetails from '@/components/modes/centurion/CenturionTapeDetails.vue';
import SubscribersSelect from '@/components/modes/SubscribersSelect.vue';
import { computed, ref } from 'vue';
import CenturionInitializeDialog from '@/components/modes/centurion/CenturionInitializeDialog.vue';

const store = useCenturionStore();

const selectedTapeName = ref<string>();
const selectedTape = computed(() => {
  return store.tapes?.find((t) => t.name === selectedTapeName.value);
});

const selectedAudios = ref<number[]>([]);
const selectedScreens = ref<number[]>([]);
const selectedLightGroups = ref<number[]>([]);

const confirmModalOpen = ref<boolean>(false);
const canOpenConfirmModal = computed(() => {
  return selectedTapeName.value !== undefined && selectedAudios.value.length > 0;
});

</script>

<style scoped>

</style>
