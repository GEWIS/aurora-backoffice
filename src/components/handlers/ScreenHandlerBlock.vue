<template>
  <div class="card mb-0">
    <h4><FontAwesomeIcon class="mr-3" :icon="faDisplay" />Screens</h4>
    <div class="flex justify-content-evenly flex-wrap">
      <div v-for="screen in subscriberStore.screens.value" :key="screen.id" class="m-3">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberItemContent from '@/components/handlers/SubscriberItemContent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const subscriberStore = storeToRefs(useSubscriberStore());
const handlersStore = useHandlersStore();
</script>

<style scoped lang="scss"></style>
