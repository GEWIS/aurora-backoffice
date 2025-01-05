<template>
  <TimedEventParamsHandler
    :cron-expression="cronExpression"
    :cron-valid="cronValid"
    event-spec-type="switch-handler-screen"
    :handlers="handlers"
    :on-save="onSave"
    :original-event-spec-params="originalEventSpecParams"
    :skip-next="skipNext"
    :subscribers="screens"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useHandlersStore } from '@/stores/handlers.store';
import TimedEventParamsHandler from '@/components/timed-events/types/TimedEventParamsHandler.vue';
import type { CreateTimedEventRequest, SwitchHandlerParams } from '@/api';

defineProps<{
  originalEventSpecParams?: SwitchHandlerParams;
  cronExpression: string;
  cronValid: boolean;
  skipNext?: boolean;
  onSave: (params: CreateTimedEventRequest, skipNext?: boolean) => Promise<void>;
}>();

const subscriberStore = useSubscriberStore();
const handlersStore = useHandlersStore();

const screens = computed(() => {
  return subscriberStore.screens.map((s) => ({ label: s.name, id: s.id }));
});
const handlers = computed(() => {
  return handlersStore.screenHandlers.map((s) => ({ name: s.name }));
});
</script>

<style scoped></style>
