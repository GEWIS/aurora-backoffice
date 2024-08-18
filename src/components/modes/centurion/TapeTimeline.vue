<template>
  <Menu
    :model="timelineItems as Array<MenuItem>"
    class="!border-none columns-1 md:columns-2 lg:columns-3 xl:columns-4 xxl:columns-5"
  >
    <template #item="{ item, props }">
      <a class="flex justify-between" v-bind="props.action">
        <div class="flex gap-4">
          <span v-if="item.timestamp"
            ><b>{{ item.timestamp }}</b></span
          >
          <div class="flex gap-2 align-middle">
            <div v-if="Array.isArray(item.label)">
              <div class="flex flex-col gap-4">
                <span v-if="item.icon" :class="item.icon + ' mr-1'" />
                <div v-for="label in item.label" v-bind:key="label" class="flex flex-col gap-2">
                  <i>{{ label.artist }}</i>
                  <span>{{ label.title }}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <span v-if="item.icon" :class="item.icon + ' mr-1'" />
              {{ item.label }}
            </div>
          </div>
        </div>
        <span v-if="item.disabled" class="pi pi-spin pi-spinner" />
      </a>
      <divider v-if="!Array.isArray(item.label)" />
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { computed, type ComputedRef, ref } from 'vue';
import type { MixTapeResponse, SongData, SongEvent } from '@/api';
import { formatDuration } from '@/utils/formatterUtils';
import type { MenuItem } from 'primevue/menuitem';

interface TimelineItem {
  label?: string | Array<SongData>;
  timestamp: string;
  command: () => Promise<void>;
  icon?: string;
  disabled: ComputedRef<boolean>;
}

const store = useCenturionStore();

const props = defineProps<{
  tape?: MixTapeResponse;
}>();

const getTracks = (event: SongEvent): Array<SongData> => {
  let tracks = event.data as SongData | Array<SongData>;
  if (!Array.isArray(tracks)) tracks = [tracks];
  return tracks;
};

const isDisabled = () => {
  return store.skipping;
};

const timelineItems = ref(
  props.tape?.events.reduce((timelineItems, event) => {
    const timelineItem: TimelineItem = {
      timestamp: formatDuration(event.timestamp),
      disabled: computed(() => isDisabled()),
      command: async () => {
        await store.skipCenturion(event.timestamp);
      }
    };

    if (event.type === 'horn') {
      timelineItem.label = event.data.counter.toString();
      timelineItem.icon = 'pi pi-volume-up';
    }

    if (event.type === 'song') {
      timelineItem.label = getTracks(event as unknown as SongEvent);
    }

    timelineItems.push(timelineItem);
    return timelineItems;
  }, [] as Array<TimelineItem>) ?? []
);
</script>

<style scoped></style>
