<template>
  <Dialog
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    closable
    close-on-escape
    dismissable-mask
    header="Set button"
    modal
    :style="{ width: '50vw' }"
    :visible="visible"
    @update:visible="$emit('close')"
  >
    <div class="flex flex-col gap-4 py-1 w-full">
      <FloatLabel variant="on">
        <Select
          id="lights-controller-button-type"
          v-model="type"
          class="w-full"
          option-label="name"
          option-value="value"
          :options="typeOptions"
        />
        <label for="lights-controller-button-type">Button function</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="lights-controller-button-name" v-model="name" autocomplete="off" class="w-full" />
        <label for="lights-controller-button-name">Name (optional)</label>
      </FloatLabel>
      <Divider />
      <ButtonDialogColors v-if="type === ButtonTypes.LightsButtonColors" />
      <ButtonDialogEffectColor v-if="type === ButtonTypes.LightsButtonEffectColor" />
      <ButtonDialogEffectMovement v-if="type === ButtonTypes.LightsButtonEffectMovement" />
      <ButtonDialogStrobe v-if="type === ButtonTypes.LightsButtonStrobe" />
      <ButtonDialogSwitch v-if="type === ButtonTypes.LightsButtonSwitch" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { LightsPredefinedEffectResponse } from '@/api';
import ButtonDialogColors from '@/components/lights/effects/button/ButtonDialogColors.vue';
import ButtonDialogEffectColor from '@/components/lights/effects/button/ButtonDialogEffectColor.vue';
import ButtonDialogEffectMovement from '@/components/lights/effects/button/ButtonDialogEffectMovement.vue';
import ButtonDialogStrobe from '@/components/lights/effects/button/ButtonDialogStrobe.vue';
import ButtonDialogSwitch from '@/components/lights/effects/button/ButtonDialogSwitch.vue';

enum ButtonTypes {
  LightsButtonColors = 'LightsButtonColors',
  LightsButtonEffectColor = 'LightsButtonEffectColor',
  LightsButtonEffectMovement = 'LightsButtonEffectMovement',
  LightsButtonNull = 'LightsButtonNull',
  LightsButtonStrobe = 'LightsButtonStrobe',
  LightsButtonSwitch = 'LightsButtonSwitch',
}

const props = defineProps<{
  button?: LightsPredefinedEffectResponse;
  visible?: boolean;
}>();

defineEmits<{
  close: [];
}>();

const name = ref<string | undefined>(props.button?.name);
const type = ref<ButtonTypes>((props.button?.properties.type as ButtonTypes) ?? ButtonTypes.LightsButtonNull);

const typeOptions = [
  { name: 'Colors', value: ButtonTypes.LightsButtonColors },
  { name: 'Color effect', value: ButtonTypes.LightsButtonEffectColor },
  { name: 'Movement effect', value: ButtonTypes.LightsButtonEffectMovement },
  { name: 'Strobe', value: ButtonTypes.LightsButtonStrobe },
  { name: 'Switch', value: ButtonTypes.LightsButtonSwitch },
];
</script>

<style scoped></style>
