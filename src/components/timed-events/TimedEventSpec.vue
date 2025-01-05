<template>
  <TimedEventTag
    v-if="props.eventSpec.type === 'system-reset'"
    description="Reset system to initial state."
    label="System reset"
  />
  <TimedEventTag
    v-if="props.eventSpec.type === 'clean-audit-logs'"
    description="Remove all expired audit logs from the database."
    label="Clean audit logs"
  />
  <TimedEventTag
    v-if="props.eventSpec.type === 'switch-handler-audio'"
    description=""
    :label="`Switch handler audio '${props.eventSpec.params.id}' to ${props.eventSpec.params.handler}`"
  />
  <TimedEventTag
    v-if="props.eventSpec.type === 'switch-handler-lights'"
    description=""
    :label="`Switch handler lights group '${props.eventSpec.params.id}' to ${props.eventSpec.params.handler}`"
  />
  <TimedEventTag
    v-if="props.eventSpec.type === 'switch-handler-screen'"
    description=""
    :label="`Switch handler screen '${props.eventSpec.params.id}' to ${props.eventSpec.params.handler}`"
  />
</template>

<script setup lang="ts">
import type { EventSpec } from '@/api';
import TimedEventTag from '@/components/timed-events/TimedEventTag.vue';

const props = defineProps<{
  eventSpec: EventSpec;
}>();
</script>

<style scoped></style>
