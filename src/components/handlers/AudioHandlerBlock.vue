<template>
  <BasicBlock header="Audio" icon="pi-volume-up">
    <div class="flex justify-content-between flex-wrap">
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
  </BasicBlock>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberItemContent from '@/components/handlers/SubscriberItemContent.vue';
import BasicBlock from '@/components/BasicBlock.vue';

const subscriberStore = storeToRefs(useSubscriberStore());
const handlersStore = useHandlersStore();
</script>

<style scoped lang="scss"></style>
