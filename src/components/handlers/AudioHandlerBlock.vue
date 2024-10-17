<template>
  <AppContainer title="Audio" icon="pi-volume-up">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 xxl:grid-cols-3 gap-5"
    >
      <div v-for="audio in subscriberStore.audios.value" :key="audio.id">
        <SubscriberItemContent
          :subscriber="audio"
          :current-handler="
            handlersStore.audioHandlers.find((h) => !!h.entities.find((e) => e.id === audio.id))
          "
          :possible-handlers="handlersStore.audioHandlers"
          :loading="handlersStore.gettingAudio || handlersStore.settingAudio"
          :disabled="!authStore.isInSecurityGroup('handler', 'privileged')"
          @change="
            (newHandler: string | null) => handlersStore.setAudioHandler(audio.id, newHandler)
          "
        />
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberItemContent from '@/components/handlers/SubscriberItemContent.vue';
import AppContainer from '@/layout/AppContainer.vue';
import { useAuthStore } from '@/stores/auth.store';

const subscriberStore = storeToRefs(useSubscriberStore());
const handlersStore = useHandlersStore();
const authStore = useAuthStore();
</script>

<style scoped lang="scss"></style>
