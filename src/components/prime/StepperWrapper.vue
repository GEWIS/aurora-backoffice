<template>
  <Stepper value="1">
    <StepList v-if="!vertical">
      <Step v-for="(step, index) in steps" :key="index" :value="(index + 1).toString()">
        {{ step.value }}
      </Step>
    </StepList>

    <StepPanels>
      <StepperWrapper
        v-for="(step, index) in steps"
        :key="step.value"
        :header="step.value"
        :value="(index + 1).toString()"
        :wrap="vertical"
      >
        <StepPanel v-slot="{ activateCallback }" :value="(index + 1).toString()">
          <AppBox class="mb-4">
            <slot :name="index + 1" />
            <div class="flex pt-3 justify-center gap-5">
              <Button
                v-if="index > 0"
                :disabled="steps[index].previousDisabled"
                icon="pi pi-chevron-left"
                severity="secondary"
                @click="activateCallback(index.toString())"
              />
              <Button
                v-if="index < steps.length - 1"
                :disabled="steps[index].nextDisabled"
                icon="pi pi-chevron-right"
                @click="activateCallback((index + 2).toString())"
              />
              <Button
                v-if="index === steps.length - 1"
                icon="pi pi-check"
                @click="steps[index].confirmFunction"
              />
            </div>
          </AppBox>
        </StepPanel>
      </StepperWrapper>
    </StepPanels>
  </Stepper>
</template>

<script setup lang="ts">
import StepPanel from 'primevue/steppanel';
import StepList from 'primevue/steplist';
import Stepper from 'primevue/stepper';
import Step from 'primevue/step';
import StepPanels from 'primevue/steppanels';
import { computed } from 'vue';
import StepperWrapper from '@/components/prime/VerticalStepperWrapper.vue';
import AppBox from '@/layout/AppBox.vue';
import { TailwindWidth, useLayoutStore } from '@/stores/layout.store';

interface StepperStep {
  value: string;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
  confirmFunction?: () => void;
}

defineProps<{
  steps: StepperStep[];
}>();

const layoutStore = useLayoutStore();
const vertical = computed(() => layoutStore.getWindowWidth < TailwindWidth.sm);

export type { StepperStep };
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
