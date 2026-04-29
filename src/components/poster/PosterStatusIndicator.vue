<template>
  <button
    v-tooltip.top="tooltip"
    :aria-label="tooltip"
    :class="['w-3 h-3 rounded-full shrink-0 transition cursor-pointer', colorClass]"
    @click.stop="onToggle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type LocalPosterResponse } from '@/api';
import { usePosterStore } from '@/stores/poster/poster.store';

const props = defineProps<{
  poster: LocalPosterResponse;
}>();

const store = usePosterStore();

const isExpired = computed(() => {
  const d = props.poster.expirationDate;
  return !!d && new Date(d).getTime() < Date.now();
});

const isScheduled = computed(() => {
  const d = props.poster.startDate;
  return !!d && new Date(d).getTime() > Date.now();
});

const status = computed<'live' | 'borrel' | 'expired' | 'scheduled' | 'disabled'>(() => {
  if (!props.poster.enabled) return 'disabled';
  if (isExpired.value) return 'expired';
  if (isScheduled.value) return 'scheduled';
  if (props.poster.borrelMode) return 'borrel';
  return 'live';
});

const colorClass = computed(
  () =>
    ({
      live: 'bg-green-500 hover:bg-green-400',
      borrel: 'bg-amber-600 hover:bg-amber-500',
      expired: 'bg-gray-400 hover:bg-gray-300',
      scheduled: 'bg-gray-400 hover:bg-gray-300',
      disabled: 'bg-red-500 hover:bg-red-400',
    })[status.value],
);

const tooltip = computed(
  () =>
    ({
      live: 'Enabled',
      borrel: 'Borrel only',
      expired: 'Expired',
      scheduled: 'Not yet active',
      disabled: 'Disabled',
    })[status.value],
);

const onToggle = () => store.togglePoster(props.poster.id, !props.poster.enabled);
</script>

<style scoped></style>
