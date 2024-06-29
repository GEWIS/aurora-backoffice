<template>
  <div class="card mb-0">
    <h4><FontAwesomeIcon class="mr-3" :icon="faVolumeHigh" />Audio</h4>
    <div class="flex justify-content-evenly flex-wrap">
      <div v-for="audio in subscriberStore.audios.value" :key="audio.id" class="m-3">
        <SubscriberItemContent
          :subscriber="audio"
          :current-handler="
            handlersStore.audioHandlers.find((h) => !!h.entities.find((e) => e.id === audio.id))
          "
          :possible-handlers="handlersStore.audioHandlers"
          @change="
            (newHandler: string | null) => handlersStore.setAudioHandler(audio.id, newHandler)
          "
          :loading="handlersStore.loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberItemContent from '@/components/handlers/SubscriberItemContent.vue';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const subscriberStore = storeToRefs(useSubscriberStore());
const handlersStore = useHandlersStore();
</script>

<style scoped lang="scss"></style>
