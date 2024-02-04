<script setup lang="ts">;
import type { LightsGroupResponse } from '@/api/Client';

defineProps<{
  lightsGroup: LightsGroupResponse;
  disabled?: boolean;
  enabled?: boolean;
}>();
</script>

<template>
  <ToggleButton
    :model-value="!!enabled"
    on-label=""
    off-label=""
    class="flex flex-row w-auto"
    :disabled="disabled"
  >
    <template #icon="">
      <div class="flex flex-column button-content px-2">
        <div>{{ lightsGroup.name }} (ID: {{ lightsGroup.id }})</div>
        <div>
          <ul class="my-0" style="margin-left: -1.5rem">
            <li>Pars: {{ lightsGroup.pars.length }}</li>
            <li>
              MH's: {{ lightsGroup.movingHeadRgbs.length + lightsGroup.movingHeadWheels.length }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </ToggleButton>
</template>

<style scoped>
@import '../../../styles/BasePage.scss';

.button-content > :nth-child(1) {
  font-weight: bold;
}

.button-content li {
  text-align: left;
}
</style>
