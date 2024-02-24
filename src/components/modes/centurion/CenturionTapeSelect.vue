<template>
  <Panel header="Tapes" action="Start">
    <template #default>
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
    <template #footer>
      <div class="text-right">
        <Button size="small">Initialize</Button>
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import CenturionTapeDetails from '@/components/modes/centurion/CenturionTapeDetails.vue';
import SubscribersSelect from '@/components/modes/SubscribersSelect.vue';
import { computed, ref } from 'vue';

const store = useCenturionStore();

const selectedTapeName = ref<string>();
const selectedTape = computed(() => {
  return store.tapes?.find((t) => t.name === selectedTapeName.value);
});

const selectedAudios = ref<number[]>([]);
const selectedScreens = ref<number[]>([]);
const selectedLightGroups = ref<number[]>([]);

</script>

<style scoped>

</style>
