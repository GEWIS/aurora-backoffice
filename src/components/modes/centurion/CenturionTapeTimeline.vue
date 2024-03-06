<template>
  <template v-if="!store.loading && !!tape">
    <table>
      <tbody>
        <tr v-for="event in tape.events" :key="JSON.stringify(event)">
          <td>
            <Button
              size="small"
              title="Move to this timestamp"
              :style="{ padding: '0.5rem' }"
              @click="
                async () => {
                  loading = true;
                  await store.skipCenturion(event.timestamp);
                  loading = false;
                }
              "
              :loading="loading"
            >
              <FontAwesomeIcon :icon="faClockRotateLeft" />
            </Button>
          </td>
          <td>
            <CenturionTapeTimelineHorn v-if="event.type === 'horn'" :horn="event as HornEvent" />
            <CenturionTapeTimelineSong v-if="event.type === 'song'" :song="event as SongEvent" />
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  <template v-else>
    <table>
      <tbody>
        <tr>
          <td><Skeleton size="2rem" class="mr-2" /></td>
          <td><Skeleton width="20rem" /></td>
        </tr>
        <tr>
          <td><Skeleton size="2rem" class="mr-2" /></td>
          <td><Skeleton width="20rem" /></td>
        </tr>
        <tr>
          <td><Skeleton size="2rem" class="mr-2" /></td>
          <td><Skeleton width="20rem" /></td>
        </tr>
        <tr>
          <td><Skeleton size="2rem" class="mr-2" /></td>
          <td><Skeleton width="20rem" /></td>
        </tr>
        <tr>
          <td><Skeleton size="2rem" class="mr-2" /></td>
          <td><Skeleton width="20rem" /></td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

<script setup lang="ts">
import { HornEvent, type MixTapeResponse, SongEvent } from '@/api/Client';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import CenturionTapeTimelineHorn from '@/components/modes/centurion/CenturionTapeTimelineHorn.vue';
import CenturionTapeTimelineSong from '@/components/modes/centurion/CenturionTapeTimelineSong.vue';
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { ref } from 'vue';

const store = useCenturionStore();

defineProps<{
  tape?: MixTapeResponse;
}>();

const loading = ref(false);
</script>

<style scoped></style>
