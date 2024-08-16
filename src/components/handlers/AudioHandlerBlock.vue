<template>
  <BasicBlock header="Audio" icon="pi-volume-up">
    <div class="grid">
      <div
        v-for="audio in subscriberStore.audios.value"
        :key="audio.id"
        class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-6 xxl:col-4"
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
