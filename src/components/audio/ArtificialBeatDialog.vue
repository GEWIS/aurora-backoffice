<template>
  <Button @click="visible = true"> Beat Generator </Button>

  <Dialog
    v-model:visible="visible"
    dismissable-mask
    header="Artifical Beat Generator"
    modal
    @after-hide="taps = []"
    @show="onDialogShow"
  >
    <div class="flex flex-column gap-3 justify-content-center">
      <div v-if="!currentBpmLoading && currentBpm != null">Current BPM: {{ currentBpm }}</div>
      <div v-else-if="!currentBpmLoading">Artificial Beat Generator is inactive</div>
      <div v-else>
        <Spinner />
      </div>
      <div class="flex flex-column gap-1">
        <div class="h-8rem border-1 flex flex-column flex-wrap justify-content-center align-items-center">
          <p v-if="getBpm() != null">{{ getBpm() }} BPM</p>
          <p v-else>Tap to set BPM</p>
          <span>
            {{ renderTaps() }}
          </span>
        </div>
        <div class="flex flex-row gap-1 justify-content-center">
          <Button label="Tap" @click="taps.push(new Date())" />
          <Button label="Reset" severity="secondary" @click="taps = []" />
        </div>
      </div>
      <Button
        :disabled="taps.length < 4"
        label="Set BPM"
        :loading="savingBpmLoading"
        severity="success"
        @click="setArtificialBeats"
      />
      <Button
        label="Disable artificial beats"
        :loading="stopBpmLoading"
        severity="danger"
        @click="stopArtificialBeats"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { splitArrayIntoChunks } from '@/utils/arrayUtils';
import { getArtificalBeatGenerator, startArtificialBeatGenerator, stopArtificialBeatGenerator } from '@/api';

const visible = ref<boolean>(false);
const taps = ref<Date[]>([]);
const currentBpm = ref<number | null>(null);
const currentBpmLoading = ref<boolean>(false);

const savingBpmLoading = ref<boolean>(false);
const stopBpmLoading = ref<boolean>(false);

const renderTaps = () => {
  const formattedTaps = taps.value.map(() => '*');
  const chunks = splitArrayIntoChunks(formattedTaps, 4);
  return chunks.map((c) => c.join('')).join(' ');
};

const fetchCurrentBpm = () => {
  getArtificalBeatGenerator()
    .then((beats) => {
      currentBpm.value = beats.data!.bpm;
    })
    .finally(() => (currentBpmLoading.value = false));
};

const getBpm = () => {
  if (taps.value.length < 4) return null;
  const first = taps.value[0];
  const last = taps.value[taps.value.length - 1];
  const msDiff = last.getTime() - first.getTime();
  const bpm = (60000 * (taps.value.length - 1)) / msDiff;
  return Math.round(bpm);
};

const onDialogShow = () => {
  currentBpmLoading.value = true;
  fetchCurrentBpm();
};

const setArtificialBeats = () => {
  const bpm = getBpm();
  if (bpm == null) return;
  savingBpmLoading.value = true;
  startArtificialBeatGenerator({ body: { bpm: bpm } })
    .then(() => (visible.value = false))
    .finally(() => (savingBpmLoading.value = false));
};

const stopArtificialBeats = () => {
  stopBpmLoading.value = true;
  stopArtificialBeatGenerator()
    .then(() => (visible.value = false))
    .finally(() => (stopBpmLoading.value = false));
};
</script>

<style scoped></style>
