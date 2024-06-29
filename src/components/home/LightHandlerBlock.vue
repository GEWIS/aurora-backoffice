<template>
  <div class="card mb-0">
    <h5>Lights</h5>
    <div class="flex justify-content-between mb-3">
      <SubscriberItemComponent
        v-for="controller in controllers"
        :key="controller.id"
        :subscriber="controller"
        :icon="faLightbulb"
      >
        <LightsControllerItemComponent :controller="controller" />
      </SubscriberItemComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import SubscriberItemComponent from '@/components/home/SubscriberItemComponent.vue';
import { computed } from 'vue';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import LightsControllerItemComponent from '@/components/home/LightsControllerItemComponent.vue';

const subscriberStore = storeToRefs(useSubscriberStore());
const controllers = computed(() =>
  subscriberStore.lightsGroups.value
    .map((g) => g.controller)
    .filter((c1, index, all) => index === all.findIndex((c2) => c1.id === c2.id))
);
</script>

<style scoped lang="scss"></style>
