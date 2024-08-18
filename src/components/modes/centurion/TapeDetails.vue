<template>
  <table class="w-full">
    <tbody>
      <tr>
        <td class="font-bold">Duration</td>
        <td>{{ formatDuration($props.tape.duration) }}</td>
      </tr>
      <tr>
        <td class="font-bold">Horns</td>
        <td>{{ $props.tape.horns }}</td>
      </tr>
      <tr>
        <td class="font-bold">Frequency</td>
        <td>{{ timePerHorn }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { formatDuration } from '@/utils/formatterUtils';
import { computed } from 'vue';
import type { MixTapeResponse } from '@/api';

const props = defineProps<{
  tape: MixTapeResponse;
}>();

const timePerHorn = computed(
  () => Math.round((props.tape.duration / props.tape.horns) * 1000) / 1000
);
</script>
