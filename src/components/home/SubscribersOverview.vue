<template>
  <div>
    <Panel header="Current Subscribers">
      <table class="w-full" style="table-layout: fixed">
        <tbody>
          <tr>
            <td colspan="4">
              <div class="text-center uppercase">
                <span style="color: #d40000" class="m-auto">Screens</span>
              </div>
            </td>
          </tr>
          <SubscriberItemComponent
            v-for="screen in subscriberStore.screens.value"
            :key="screen.id"
            :subscriber="screen"
            :icon="faDisplay"
          >
            <SubscriberItemContent
              :subscriber="screen"
              :current-handler="
                handlersStore.screenHandlers.find(
                  (h) => !!h.entities.find((e) => e.id === screen.id)
                )
              "
              :possible-handlers="handlersStore.screenHandlers"
              @change="
                (newHandler: string | null) => handlersStore.setScreenHandler(screen.id, newHandler)
              "
              :loading="handlersStore.loading"
            />
          </SubscriberItemComponent>
          <tr>
            <td colspan="4">
              <div class="text-center uppercase mt-3">
                <span style="color: #d40000" class="m-auto">Audio players</span>
              </div>
            </td>
          </tr>
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
          <tr>
            <td colspan="4">
              <div class="text-center uppercase mt-3">
                <span style="color: #d40000" class="m-auto">Light controllers</span>
              </div>
            </td>
          </tr>
          <SubscriberItemComponent
            v-for="controller in controllers"
            :key="controller.id"
            :subscriber="controller"
            :icon="faLightbulb"
          >
            <LightsControllerItemComponent :controller="controller" />
          </SubscriberItemComponent>
        </tbody>
      </table>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import SubscriberItemComponent from '@/components/home/SubscriberItemComponent.vue';
import { computed } from 'vue';
import { faDisplay, faLightbulb, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { useHandlersStore } from '@/stores/handlers.store';
import SubscriberItemContent from '@/components/home/SubscriberItemContent.vue';
import LightsControllerItemComponent from '@/components/home/LightsControllerItemComponent.vue';

const subscriberStore = storeToRefs(useSubscriberStore());
const handlersStore = useHandlersStore();
const controllers = computed(() =>
  subscriberStore.lightsGroups.value
    .map((g) => g.controller)
    .filter((c1, index, all) => index === all.findIndex((c2) => c1.id === c2.id))
);
</script>

<style scoped lang="scss"></style>
