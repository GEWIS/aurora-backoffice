<template>
  <button
    v-tooltip.top="tooltip"
    :aria-label="tooltip"
    :class="[
      'w-3 h-3 rounded-full shrink-0 transition',
      isPrivileged ? 'cursor-pointer' : 'cursor-default',
      colorClass,
    ]"
    :disabled="!isPrivileged"
    @click.stop="onToggle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type PosterResponse } from '@/api';
import { usePosterStore } from '@/stores/poster/poster.store';
import { useAuthStore } from '@/stores/auth.store';

const props = defineProps<{
  poster: PosterResponse;
}>();

const store = usePosterStore();
const authStore = useAuthStore();
const isPrivileged = computed(() => authStore.isInSecurityGroup('poster', 'privileged'));

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

const colorClass = computed(() => {
  const base = {
    live: 'bg-green-500',
    borrel: 'bg-amber-600',
    expired: 'bg-gray-400',
    scheduled: 'bg-gray-400',
    disabled: 'bg-red-500',
  }[status.value];
  const hover = {
    live: 'hover:bg-green-400',
    borrel: 'hover:bg-amber-500',
    expired: 'hover:bg-gray-300',
    scheduled: 'hover:bg-gray-300',
    disabled: 'hover:bg-red-400',
  }[status.value];
  return isPrivileged.value ? `${base} ${hover}` : base;
});

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
