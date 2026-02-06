<template>
  <div class="relative text-sm">
    <i :class="['pi cursor-pointer', statusIcon]" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" />
    <div v-if="showTooltip" class="tooltip absolute left-full top-0 ml-2 whitespace-nowrap rounded px-2 py-1 z-10">
      <div v-if="connected && status">
        <div>{{ timeStatus }}</div>
        <div>Latency: {{ latency }}</div>
        <div>Uptime: {{ uptime }}</div>
      </div>
      <div v-else>
        {{ statusText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, ref } from 'vue';
import type { Status } from '@/stores/status.store';
import type {
  AudioResponse,
  LightsControllerResponse,
  PartialRecordSocketioNamespacesString,
  ScreenResponse,
} from '@/api';

const props = defineProps<{
  subscriber: AudioResponse | ScreenResponse | LightsControllerResponse;
  status: Status | undefined;
}>();

const showTooltip = ref(false);
const connected: ComputedRef<boolean> = computed(() => {
  const socketIds = props.subscriber.socketIds as PartialRecordSocketioNamespacesString;
  return Object.entries(socketIds ?? {}).length > 0;
});

const timeDrift: ComputedRef<number> = computed(() => {
  if (!props.status?.coreTimestamp || !props.status?.systemTimestamp) return 0;
  return Math.round((props.status.coreTimestamp - props.status.systemTimestamp) / 1000);
});

const isSynced: ComputedRef<boolean> = computed(() => {
  return timeDrift.value === 0 && (props.status?.latencyMilliseconds ?? 0) < 100;
});

const timeStatus: ComputedRef<string> = computed(() => {
  if (!props.status?.systemTimestamp) return 'N/A';

  const systemTime = new Date(props.status.systemTimestamp).toLocaleTimeString();

  const drift = timeDrift.value;
  if (drift === 0) {
    return `${systemTime} (synchronized)`;
  } else {
    const absDrift = Math.abs(drift);
    const direction = drift > 0 ? 'behind' : 'ahead';
    return `${systemTime} (${absDrift}s ${direction})`;
  }
});

const latency: ComputedRef<string> = computed(() => {
  if (props.status?.latencyMilliseconds === undefined) return 'N/A';
  return `${props.status?.latencyMilliseconds}ms`;
});

const uptime: ComputedRef<string> = computed(() => {
  if (props.status?.uptimeSeconds === undefined) return 'N/A';
  const seconds = props.status.uptimeSeconds;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
});

const statusIcon: ComputedRef<string[]> = computed(() => {
  if (!connected.value) return ['pi-sort-alt-slash', 'text-gray-500'];
  return !props.status || isSynced.value
    ? ['pi-sort-alt', 'text-green-300']
    : ['pi-exclamation-triangle', 'text-yellow-300'];
});

const statusText: ComputedRef<string> = computed(() => {
  if (!connected.value) return 'disconnected';
  if (!props.status) return 'status unavailable';
  return 'connected';
});
</script>

<style lang="scss">
.tooltip {
  background-color: var(--surface-hover);
  color: var(--text-on-surface);
}
</style>
