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
    @update:model-value="(e) => (effect = e)"
  />
  <EffectRandomPosition
    v-if="chosenEffect === MovementEffects_RandomPosition.RANDOM_POSITION"
    @update:model-value="(e) => (effect = e)"
  />
  <EffectSearchLight
    v-if="chosenEffect === MovementEffects_SearchLight.SEARCH_LIGHT"
    @update:model-value="(e) => (effect = e)"
  />
  <EffectTableRotate
    v-if="chosenEffect === MovementEffects_TableRotate.TABLE_ROTATE"
    @update:model-value="(e) => (effect = e)"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  type LightsEffectsMovementCreateParams,
  MovementEffects_ClassicRotate,
  MovementEffects_RandomPosition,
  MovementEffects_SearchLight,
  MovementEffects_TableRotate,
} from '@/api';
import LightsGroupsSelect from '@/components/lights/effects/button/LightsGroupsSelect.vue';
import EffectClassicRotate from '@/components/lights/effects/movement/EffectClassicRotate.vue';
import EffectRandomPosition from '@/components/lights/effects/movement/EffectRandomPosition.vue';
import EffectSearchLight from '@/components/lights/effects/movement/EffectSearchLight.vue';
import EffectTableRotate from '@/components/lights/effects/movement/EffectTableRotate.vue';

const chosenEffect = ref<LightsEffectsMovementCreateParams['type']>();
const effect = ref<LightsEffectsMovementCreateParams>();
const lightsGroupIds = ref<number[]>([]);

const effectOptions = computed(() => {
  return [
    { label: 'ClassicRotate', value: MovementEffects_ClassicRotate.CLASSIC_ROTATE },
    { label: 'RandomPosition', value: MovementEffects_RandomPosition.RANDOM_POSITION },
    { label: 'SearchLight', value: MovementEffects_SearchLight.SEARCH_LIGHT },
    { label: 'TableRotate', value: MovementEffects_TableRotate.TABLE_ROTATE },
  ];
});
</script>

<style scoped></style>
