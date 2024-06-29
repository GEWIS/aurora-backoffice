<template>
  <div class="card mb-0">
    <h4><FontAwesomeIcon class="mr-3" :icon="faLightbulb" />Lights</h4>
    <div class="flex justify-content-between mb-3">
      <div v-for="controller in controllers" :key="controller.id" class="m-3">
        <LightsControllerItemComponent :controller="controller" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { computed } from 'vue';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import LightsControllerItemComponent from '@/components/home/LightsControllerItemComponent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const subscriberStore = storeToRefs(useSubscriberStore());
const controllers = computed(() =>
  subscriberStore.lightsGroups.value
    .map((g) => g.controller)
    .filter((c1, index, all) => index === all.findIndex((c2) => c1.id === c2.id))
);
</script>

<style scoped lang="scss"></style>
