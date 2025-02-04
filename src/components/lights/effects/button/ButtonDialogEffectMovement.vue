<template>
  <Select
    id="controller-button-movement-effect"
    v-model="chosenEffect"
    option-label="label"
    option-value="value"
    :options="effectOptions"
    placeholder="Select an effect..."
  />
  <LightsGroupsSelect v-model="lightsGroupIds" />
  <Divider />
  <EffectClassicRotate
    v-if="chosenEffect === MovementEffects_ClassicRotate.CLASSIC_ROTATE"
    :default-model-value="
      defaultProperties?.effectProps.type === MovementEffects_ClassicRotate.CLASSIC_ROTATE
        ? defaultProperties.effectProps
        : undefined
    "
    @update:model-value="(e) => (effect = e)"
  />
  <EffectRandomPosition
    v-if="chosenEffect === MovementEffects_RandomPosition.RANDOM_POSITION"
    :default-model-value="
      defaultProperties?.effectProps.type === MovementEffects_RandomPosition.RANDOM_POSITION
        ? defaultProperties.effectProps
        : undefined
    "
    @update:model-value="(e) => (effect = e)"
  />
  <EffectSearchLight
    v-if="chosenEffect === MovementEffects_SearchLight.SEARCH_LIGHT"
    :default-model-value="
      defaultProperties?.effectProps.type === MovementEffects_SearchLight.SEARCH_LIGHT
        ? defaultProperties.effectProps
        : undefined
    "
    @update:model-value="(e) => (effect = e)"
  />
  <EffectTableRotate
    v-if="chosenEffect === MovementEffects_TableRotate.TABLE_ROTATE"
    :default-model-value="
      defaultProperties?.effectProps.type === MovementEffects_TableRotate.TABLE_ROTATE
        ? defaultProperties.effectProps
        : undefined
    "
    @update:model-value="(e) => (effect = e)"
  />
  <EffectZigZag
    v-if="chosenEffect === MovementEffects_ZigZag.ZIG_ZAG"
    :default-model-value="
      defaultProperties?.effectProps.type === MovementEffects_ZigZag.ZIG_ZAG ? defaultProperties.effectProps : undefined
    "
    @update:model-value="(e) => (effect = e)"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
  type LightsButtonEffectMovement,
  type LightsEffectsMovementCreateParams,
  MovementEffects_ClassicRotate,
  MovementEffects_RandomPosition,
  MovementEffects_SearchLight,
  MovementEffects_TableRotate,
  MovementEffects_ZigZag,
} from '@/api';
import LightsGroupsSelect from '@/components/lights/effects/button/LightsGroupsSelect.vue';
import EffectClassicRotate from '@/components/lights/effects/movement/EffectClassicRotate.vue';
import EffectRandomPosition from '@/components/lights/effects/movement/EffectRandomPosition.vue';
import EffectSearchLight from '@/components/lights/effects/movement/EffectSearchLight.vue';
import EffectTableRotate from '@/components/lights/effects/movement/EffectTableRotate.vue';
import EffectZigZag from '@/components/lights/effects/movement/EffectZigZag.vue';

const props = defineProps<{
  defaultProperties?: LightsButtonEffectMovement;
}>();

const emit = defineEmits<{
  'update:modelValue': [properties: LightsButtonEffectMovement];
  inputValid: [valid: boolean];
}>();

const chosenEffect = ref<LightsEffectsMovementCreateParams['type'] | undefined>(
  props.defaultProperties?.effectProps.type,
);
const lightsGroupIds = ref<number[]>(props.defaultProperties?.lightsGroupIds || []);
const effect = ref<LightsEffectsMovementCreateParams | undefined>(props.defaultProperties?.effectProps || undefined);

const effectOptions = computed(() => {
  return [
    { label: 'ClassicRotate', value: MovementEffects_ClassicRotate.CLASSIC_ROTATE },
    { label: 'RandomPosition', value: MovementEffects_RandomPosition.RANDOM_POSITION },
    { label: 'SearchLight', value: MovementEffects_SearchLight.SEARCH_LIGHT },
    { label: 'TableRotate', value: MovementEffects_TableRotate.TABLE_ROTATE },
    { label: 'ZigZag', value: MovementEffects_ZigZag.ZIG_ZAG },
  ];
});

const handleChange = () => {
  const inputIsValid: boolean = chosenEffect.value !== undefined && lightsGroupIds.value.length > 0;
  emit('inputValid', inputIsValid);

  if (effect.value === undefined) return;
  const properties: LightsButtonEffectMovement = {
    type: 'LightsButtonEffectMovement',
    lightsGroupIds: lightsGroupIds.value,
    effectProps: effect.value,
  };
  emit('update:modelValue', properties);
};

watch([chosenEffect, lightsGroupIds, effect], handleChange);
onMounted(handleChange);
</script>

<style scoped></style>
