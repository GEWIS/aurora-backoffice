<template>
  <div>
    <h4>Tape details</h4>
    <table class="details-table">
      <tbody>
        <tr>
          <td>Duration:</td>
          <td>{{ formatDuration($props.tape.duration) }} seconds</td>
        </tr>
        <tr>
          <td>Nr of horns:</td>
          <td>{{ $props.tape.horns }}</td>
        </tr>
        <tr>
          <td>Seconds per horn:</td>
          <td>{{ timePerHorn }} seconds</td>
        </tr>
      </tbody>
    </table>
  </div>
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

<style scoped lang="scss">
.details-table {
  td {
    padding-bottom: 0.5rem;
  }

  td:first-child {
    font-weight: bold;
    text-align: right;
    padding-right: 0.25rem;
  }
}
</style>
