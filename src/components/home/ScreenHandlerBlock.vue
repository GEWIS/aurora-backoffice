<template>
  <div class="card mb-0">
    <h5>Screens</h5>
    <div class="flex justify-content-between mb-3">
      <SubscriberItemComponent
        v-for="screen in subscriberStore.screens.value"
        :key="screen.id"
        :subscriber="screen"
        :icon="faDisplay"
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
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberItemContent from '@/components/home/SubscriberItemContent.vue';

const subscriberStore = storeToRefs(useSubscriberStore());
const handlersStore = useHandlersStore();
</script>

<style scoped lang="scss"></style>
