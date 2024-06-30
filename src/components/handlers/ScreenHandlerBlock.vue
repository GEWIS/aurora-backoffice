<template>
  <BasicBlock header="Screens" icon="pi-desktop">
    <div class="flex justify-content-between flex-wrap">
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
