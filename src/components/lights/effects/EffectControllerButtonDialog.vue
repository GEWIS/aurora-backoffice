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
    <template #default>
      <div class="flex flex-col gap-4 py-1 w-full">
        <FloatLabel variant="on">
          <Select
            id="lights-controller-button-type"
            v-model="type"
            class="w-full"
            option-label="name"
            option-value="value"
            :options="typeOptions"
            placeholder="Choose a function..."
          />
          <label for="lights-controller-button-type">Button function</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="lights-controller-button-name" v-model="name" autocomplete="off" class="w-full" />
          <label for="lights-controller-button-name">Name (optional)</label>
        </FloatLabel>
        <Divider />
        <ButtonDialogColors
          v-if="type === ButtonTypes.LightsButtonColors"
          :default-properties="
            button?.properties.type === ButtonTypes.LightsButtonColors ? button.properties : undefined
          "
          @input-valid="(v) => (propertiesValid = v)"
          @update:model-value="(p) => (properties = p)"
        />
        <ButtonDialogEffectColor
          v-if="type === ButtonTypes.LightsButtonEffectColor"
          :default-properties="
            button?.properties.type === ButtonTypes.LightsButtonEffectColor ? button.properties : undefined
          "
          @input-valid="(v) => (propertiesValid = v)"
          @update:model-value="(p) => (properties = p)"
        />
        <ButtonDialogEffectMovement
          v-if="type === ButtonTypes.LightsButtonEffectMovement"
          :default-properties="
            button?.properties.type === ButtonTypes.LightsButtonEffectMovement ? button.properties : undefined
          "
          @input-valid="(v) => (propertiesValid = v)"
          @update:model-value="(p) => (properties = p)"
        />
        <ButtonDialogStrobe
          v-if="type === ButtonTypes.LightsButtonStrobe"
          :default-properties="
            button?.properties.type === ButtonTypes.LightsButtonStrobe ? button.properties : undefined
          "
          @input-valid="(v) => (propertiesValid = v)"
          @update:model-value="(p) => (properties = p)"
        />
        <ButtonDialogSwitch
          v-if="type === ButtonTypes.LightsButtonSwitch"
          :default-properties="
            button?.properties.type === ButtonTypes.LightsButtonSwitch ? button.properties : undefined
          "
          @input-valid="(v) => (propertiesValid = v)"
          @update:model-value="(p) => (properties = p)"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row gap-2">
        <Button :disabled="!button || button.id < 0" icon="pi pi-trash" label="Delete" severity="danger" />
        <Button :disabled="!propertiesValid" icon="pi pi-save" label="Save" severity="success" @click="handleSave" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { LightsPredefinedEffectProperties, LightsPredefinedEffectResponse } from '@/api';
import ButtonDialogColors from '@/components/lights/effects/button/ButtonDialogColors.vue';
import ButtonDialogEffectColor from '@/components/lights/effects/button/ButtonDialogEffectColor.vue';
import ButtonDialogEffectMovement from '@/components/lights/effects/button/ButtonDialogEffectMovement.vue';
import ButtonDialogStrobe from '@/components/lights/effects/button/ButtonDialogStrobe.vue';
import ButtonDialogSwitch from '@/components/lights/effects/button/ButtonDialogSwitch.vue';
import { useEffectsControllerStore } from '@/stores/effects-controller.store';

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

const emit = defineEmits<{
  close: [];
}>();

const store = useEffectsControllerStore();

const name = ref<string | undefined>();
const type = ref<ButtonTypes>(ButtonTypes.LightsButtonNull);
const properties = ref<LightsPredefinedEffectProperties | undefined>();
const propertiesValid = ref<boolean>(false);

const typeOptions = [
  { name: 'Colors', value: ButtonTypes.LightsButtonColors },
  { name: 'Color effect', value: ButtonTypes.LightsButtonEffectColor },
  { name: 'Movement effect', value: ButtonTypes.LightsButtonEffectMovement },
  { name: 'Strobe', value: ButtonTypes.LightsButtonStrobe },
  { name: 'Switch', value: ButtonTypes.LightsButtonSwitch },
];

const handleSave = async () => {
  if (!propertiesValid.value || !properties.value) return;
  if (props.button.id < 0) {
    await store.createButtonEffect({ properties: properties.value, buttonId: props.button.buttonId, name: name.value });
  } else {
    await store.updateButtonEffectProperties(props.button.id, properties.value);
  }
  emit('close');
};

watch([props], () => {
  // Reset the form to default values
  propertiesValid.value = false;
  if (props.button) {
    name.value = props.button.name;
    type.value = props.button.properties.type as ButtonTypes;
    properties.value = props.button.properties;
  } else {
    name.value = undefined;
    type.value = ButtonTypes.LightsButtonNull;
    properties.value = undefined;
  }
});
</script>

<style scoped></style>
