<template>
  <div class="card mb-0">
    <h5>Audio</h5>
    <div class="flex justify-content-between mb-3">
      <SubscriberItemComponent
        v-for="audio in subscriberStore.audios.value"
        :key="audio.id"
        :subscriber="audio"
        :icon="faVolumeHigh"
      >
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
      </SubscriberItemComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import SubscriberItemComponent from '@/components/home/SubscriberItemComponent.vue';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberItemContent from '@/components/home/SubscriberItemContent.vue';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

const subscriberStore = storeToRefs(useSubscriberStore());
const handlersStore = useHandlersStore();
</script>

<style scoped lang="scss"></style>
