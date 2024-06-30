<template>
  <div class="w-full flex flex-center gap-2">
    <font-awesome-icon v-if="props.icon !== undefined" :icon="props.icon" />
    <span class="flex-1">{{ props.label }}</span>
    <div v-if="props.loading">
      <Spinner style="height: 1rem; width: 1rem" strokeWidth="8" />
    </div>
    <div v-if="props.enabled">
      <font-awesome-icon :icon="faCircle" style="color: green" />
    </div>
    <div v-if="props.disabled">
      <font-awesome-icon :icon="faCircle" style="color: red" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircle, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
  icon?: IconDefinition | undefined;
  label?: string | ((...args: any) => string) | undefined;
  loading?: boolean | undefined;
  enabled?: boolean | undefined;
  disabled?: boolean | undefined;
}>();
</script>

<style scoped></style>
