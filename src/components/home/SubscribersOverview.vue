<template>
  <div>
    <CardComponent header="Current Subscribers">
      <SubscriberItemComponent
        v-for="subscriber in active"
        :key="subscriber.id"
        :subscriber="subscriber"
      />
      <div class="text-center">
        <span style="color: #d40000" class="m-auto">INACTIVE</span>
      </div>
      <SubscriberItemComponent
        v-for="subscriber in inactive"
        :key="subscriber.id"
        :subscriber="subscriber"
      />
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import CardComponent from '@/layout/CardComponent.vue';
import SubscriberItemComponent from '@/components/home/SubscriberItemComponent.vue';
import { computed } from 'vue';

const subscribers = storeToRefs(useSubscriberStore());
const active = computed(() => subscribers.screens.value.filter((s) => s.socketId != null));
const inactive = computed(() => subscribers.screens.value.filter((s) => s.socketId == null));
</script>

<style scoped lang="scss"></style>
