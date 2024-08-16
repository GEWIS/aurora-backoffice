<template>
  <AppContainer title="Screens" icon="pi-desktop">
    <div class="grid">
      <div
        v-for="screen in subscriberStore.screens.value"
        :key="screen.id"
        class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-6 xxl:col-4"
      >
        <SubscriberItemContent
          :subscriber="screen"
          :current-handler="
            handlersStore.screenHandlers.find((h) => !!h.entities.find((e) => e.id === screen.id))
          "
          :possible-handlers="handlersStore.screenHandlers"
          @change="
            (newHandler: string | null) => handlersStore.setScreenHandler(screen.id, newHandler)
          "
          :loading="handlersStore.gettingScreens || handlersStore.settingScreens"
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

const subscriberStore = storeToRefs(useSubscriberStore());
const handlersStore = useHandlersStore();
</script>

<style scoped lang="scss"></style>
