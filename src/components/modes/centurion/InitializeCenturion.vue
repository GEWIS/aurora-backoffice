<template>
  <Stepper value="1">
    <StepList v-if="!vertical">
      <Step value="1">Tape</Step>
      <Step value="2">Audio</Step>
      <Step value="3">Screens</Step>
      <Step value="4">Lights</Step>
      <Step value="5">Confirm</Step>
    </StepList>
    <StepPanels>
      <!-- Selecting a tape -->
      <StepperWrapper :wrap="vertical" value="1" header="Tape">
        <StepPanel v-slot="{ activateCallback }" value="1">
          <div class="flex flex-col">
            <Select
              class="w-full text-overflow-ellipsis overflow-hidden"
              :modelValue="selectedTapeName"
              optionLabel="name"
              optionValue="name"
              :options="centurionStore.tapes != null ? centurionStore.tapes : undefined"
              placeholder="Select tape"
              @update:modelValue="
                (value: string) => {
                  selectedTapeName = value;
                }
              "
              :title="selectedTapeName"
            />
            <div>
              <div v-if="selectedTape" class="pt-2">
                <CenturionTapeDetails :tape="selectedTape" />
              </div>
            </div>
          </div>
          <div class="pt-3 w-full flex justify-end">
            <Button label="Next" @click="activateCallback('2')" :disabled="!selectedTapeName" />
          </div>
        </StepPanel>
      </StepperWrapper>

      <!-- Select audio -->
      <StepperWrapper :wrap="vertical" value="2" header="Audio">
        <StepPanel v-slot="{ activateCallback }" value="2">
          <div class="flex flex-column">
            <MultiSelect
              class="w-full"
              :model-value="selectedAudios"
              :options="subscriberStore.audios"
              option-label="name"
              option-value="id"
              placeholder="Select audio"
              :maxSelectedLabels="2"
              @update:modelValue="(value: number[]) => (selectedAudios = value)"
              :title="
                subscriberStore.audios
                  .filter((a) => selectedAudios.includes(a.id))
                  .map((a) => a.name)
                  .join(', ')
              "
            />
          </div>

          <div class="flex pt-3 justify-between">
            <Button label="Back" severity="secondary" @click="activateCallback('1')" />
            <Button
              label="Next"
              @click="activateCallback('3')"
              :disabled="!selectedAudios.length"
            />
          </div>
        </StepPanel>
      </StepperWrapper>

      <!-- Select screens -->
      <StepperWrapper :wrap="vertical" value="3" header="Screens">
        <StepPanel v-slot="{ activateCallback }" value="3">
          <div class="flex flex-column">
            <MultiSelect
              class="w-full"
              :model-value="selectedScreens"
              :options="subscriberStore.screens"
              option-label="name"
              option-value="id"
              placeholder="Select screens"
              :maxSelectedLabels="2"
              @update:modelValue="(value: number[]) => (selectedScreens = value)"
              :title="
                subscriberStore.screens
                  .filter((a) => selectedScreens.includes(a.id))
                  .map((a) => a.name)
                  .join(', ')
              "
            />
          </div>

          <div class="flex pt-3 justify-between">
            <Button label="Back" severity="secondary" @click="activateCallback('2')" />
            <Button
              label="Next"
              @click="activateCallback('4')"
              :disabled="!selectedScreens.length"
            />
          </div>
        </StepPanel>
      </StepperWrapper>

      <!-- Select lights -->
      <StepperWrapper :wrap="vertical" value="4" header="Lights">
        <StepPanel v-slot="{ activateCallback }" value="4">
          <div class="flex flex-column">
            <MultiSelect
              class="w-full"
              :model-value="selectedLightGroups"
              :options="subscriberStore.lightsGroups"
              option-label="name"
              option-value="id"
              placeholder="Select lights"
              :maxSelectedLabels="2"
              @update:modelValue="(value: number[]) => (selectedLightGroups = value)"
              :title="
                subscriberStore.lightsGroups
                  .filter((a) => selectedLightGroups.includes(a.id))
                  .map((a) => a.name)
                  .join(', ')
              "
            />
          </div>

          <div class="flex pt-3 justify-between">
            <Button label="Back" severity="secondary" @click="activateCallback('3')" />
            <Button
              label="Next"
              @click="activateCallback('5')"
              :disabled="!selectedLightGroups.length"
            />
          </div>
        </StepPanel>
      </StepperWrapper>

      <!-- Confirming the selection -->
      <StepperWrapper :wrap="vertical" value="5" header="Confirm">
        <StepPanel v-slot="{ activateCallback }" value="5">
          <div class="flex flex-col">
            <CenturionInitializeDialog
              v-if="canOpenConfirmModal && selectedTape"
              :visible="confirmModalOpen"
              :selected-tape="selectedTape"
              :selected-audios="selectedAudios"
              :selected-light-groups="selectedLightGroups"
              :selected-screens="selectedScreens"
              @close="confirmModalOpen = false"
            />
          </div>
          <div class="flex pt-6 justify-between">
            <Button label="Back" severity="secondary" @click="activateCallback('4')" />
            <Button size="small" :disabled="!canOpenConfirmModal" @click="confirmModalOpen = true"
              >Initialize</Button
            >
          </div>
        </StepPanel>
      </StepperWrapper>
    </StepPanels>
  </Stepper>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import CenturionTapeDetails from '@/components/modes/centurion/TapeDetails.vue';
import { computed, ref } from 'vue';
import CenturionInitializeDialog from '@/components/modes/centurion/InitializeDialog.vue';
import Stepper from 'primevue/stepper';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import { useSubscriberStore } from '@/stores/subscriber.store';
import StepPanels from 'primevue/steppanels';
import StepList from 'primevue/steplist';
import StepperWrapper from '@/components/modes/centurion/StepperWrapper.vue';

defineProps<{
  vertical: boolean;
}>();

const centurionStore = useCenturionStore();
const subscriberStore = useSubscriberStore();

const selectedTapeName = ref<string>();
const selectedTape = computed(() => {
  return centurionStore.tapes?.find((t) => t.name === selectedTapeName.value);
});

const selectedAudios = ref<number[]>([]);
const selectedScreens = ref<number[]>([]);
const selectedLightGroups = ref<number[]>([]);

const confirmModalOpen = ref<boolean>(false);
const canOpenConfirmModal = computed(() => {
  return selectedTapeName.value !== undefined && selectedAudios.value.length > 0;
});
</script>
