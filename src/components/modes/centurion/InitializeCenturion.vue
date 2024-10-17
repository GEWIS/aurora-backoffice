<template>
  <Stepper value="1">
    <StepList v-if="!vertical">
      <Step value="1">Mixtape</Step>
      <Step value="2">Subscribers</Step>
      <Step value="3">Confirmation</Step>
    </StepList>
    <StepPanels>
      <!-- Selecting a tape -->
      <StepperWrapper :wrap="vertical" value="1" header="Mixtape">
        <StepPanel v-slot="{ activateCallback }" value="1">
          <div
            class="flex flex-col gap-2 rounded-lg p-5 mt-3 sm:mt-0 mb-3 border border-surface shadow-md"
          >
            <div class="sm:text-lg text-center">Select a mixtape for this centurion</div>
            <Select
              :model-value="selectedTape"
              class="w-full sm:max-w-80 mx-auto"
              option-label="name"
              option-group-label="label"
              option-group-children="items"
              :options="availableTapes"
              placeholder="Select tape"
              :title="selectedTape?.name"
              @update:model-value="
                (value: MixTapeResponse) => {
                  selectedTape = value;
                }
              "
            >
              <template #optiongroup="slotProps">
                <p>{{ slotProps.option.label }}</p>
              </template>
            </Select>
            <div class="pt-3 w-full flex justify-center">
              <Button
                icon="pi pi-chevron-right"
                :disabled="!selectedTape"
                @click="activateCallback('2')"
              />
            </div>
          </div>
        </StepPanel>
      </StepperWrapper>

      <!-- Select audio -->
      <StepperWrapper :wrap="vertical" value="2" header="Subscribers">
        <StepPanel v-slot="{ activateCallback }" value="2">
          <div
            class="flex flex-col gap-2 rounded-lg p-5 mt-3 sm:mt-0 mb-3 border border-surface shadow-md"
          >
            <div class="sm:text-lg text-center">Select subscribers for this centurion</div>
            <MultiSelect
              class="w-full sm:max-w-80 mx-auto"
              :model-value="selectedAudios"
              :options="subscriberStore.audios"
              option-label="name"
              option-value="id"
              placeholder="Select audio"
              :max-selected-labels="2"
              :title="
                subscriberStore.audios
                  .filter((a) => selectedAudios.includes(a.id))
                  .map((a) => a.name)
                  .join(', ')
              "
              @update:model-value="(value: number[]) => (selectedAudios = value)"
            />
            <MultiSelect
              class="w-full sm:max-w-80 mx-auto"
              :model-value="selectedScreens"
              :options="subscriberStore.screens"
              option-label="name"
              option-value="id"
              placeholder="Select screens"
              :max-selected-labels="2"
              :title="
                subscriberStore.screens
                  .filter((a) => selectedScreens.includes(a.id))
                  .map((a) => a.name)
                  .join(', ')
              "
              @update:model-value="(value: number[]) => (selectedScreens = value)"
            />
            <MultiSelect
              class="w-full sm:max-w-80 mx-auto"
              :model-value="selectedLightGroups"
              :options="subscriberStore.lightsGroups"
              option-label="name"
              option-value="id"
              placeholder="Select lights"
              :max-selected-labels="2"
              :title="
                subscriberStore.lightsGroups
                  .filter((a) => selectedLightGroups.includes(a.id))
                  .map((a) => a.name)
                  .join(', ')
              "
              @update:model-value="(value: number[]) => (selectedLightGroups = value)"
            />

            <div class="flex pt-3 justify-center gap-5">
              <Button
                icon="pi pi-chevron-left"
                severity="secondary"
                @click="activateCallback('1')"
              />
              <Button
                icon="pi pi-chevron-right"
                :disabled="!selectedAudios.length"
                @click="activateCallback('3')"
              />
            </div>
          </div>
        </StepPanel>
      </StepperWrapper>

      <!-- Confirming the selection -->
      <StepperWrapper :wrap="vertical" value="3" header="Confirm">
        <StepPanel v-slot="{ activateCallback }" value="3">
          <div
            class="flex flex-col gap-2 rounded-lg p-5 mt-3 sm:mt-0 mb-3 border border-surface shadow-md"
          >
            <div class="max-w-lg mx-auto">
              <div class="sm:text-lg text-center mb-3">Confirm centurion initialization</div>
              <TapeDetails v-if="selectedTape" :tape="selectedTape" />
              <SubscriberDetails
                class="mt-3"
                :selected-audios="selectedAudios"
                :selected-screens="selectedScreens"
                :selected-light-groups="selectedLightGroups"
              />
              <div class="flex pt-6 justify-center gap-5">
                <Button
                  icon="pi pi-chevron-left"
                  severity="secondary"
                  @click="activateCallback('2')"
                />
                <Button icon="pi pi-check" :disabled="!selectedAudios.length" @click="initialize" />
              </div>
            </div>
          </div>
        </StepPanel>
      </StepperWrapper>
    </StepPanels>
  </Stepper>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import SubscriberDetails from '@/components/modes/centurion/SubscriberDetails.vue';
import { computed, ref } from 'vue';
import Stepper from 'primevue/stepper';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import { useSubscriberStore } from '@/stores/subscriber.store';
import StepPanels from 'primevue/steppanels';
import StepList from 'primevue/steplist';
import StepperWrapper from '@/components/prime/StepperWrapper.vue';
import type { MixTapeResponse } from '@/api';
import TapeDetails from '@/components/modes/centurion/TapeDetails.vue';

interface GroupedTape {
  label: string;
  code: string;
  items: MixTapeResponse[];
}

interface ArtistGroupedTape {
  [key: string]: GroupedTape;
}

defineProps<{
  vertical: boolean;
}>();

const centurionStore = useCenturionStore();
const subscriberStore = useSubscriberStore();

const selectedAudios = ref<number[]>([]);
const selectedScreens = ref<number[]>([]);
const selectedLightGroups = ref<number[]>([]);
const selectedTape = ref<MixTapeResponse | undefined>(undefined);

// The available tapes; grouped by artist
const availableTapes = computed<GroupedTape[] | undefined>(() => {
  const tapes = centurionStore.getTapes;
  if (tapes == null) return undefined;

  const tapeByArtist = tapes.reduce((accumulated, tape) => {
    if (!accumulated[tape.artist]) {
      accumulated[tape.artist] = {
        label: tape.artist,
        code: tape.artist,
        items: []
      };
    }
    accumulated[tape.artist].items.push(tape);
    return accumulated;
  }, {} as ArtistGroupedTape);

  return Object.keys(tapeByArtist).reduce((acc, artistKey) => {
    acc.push(tapeByArtist[artistKey]);
    return acc;
  }, [] as GroupedTape[]);
});

// Initialize the centurion
const initialize = async () => {
  await centurionStore.initializeCenturion(
    selectedTape.value!.name,
    selectedAudios.value,
    selectedScreens.value,
    selectedLightGroups.value
  );
};
</script>

<style lang="scss">
.p-select-option-label,
.p-select-label {
  text-overflow: ellipsis;
  overflow: hidden;
}

.p-steppanel-content,
.p-steppanel {
  padding-left: 0 !important;
}

.p-stepper-separator {
  display: none;
}

@screen sm {
  .p-stepper-separator {
    display: flex;
  }
}
</style>
