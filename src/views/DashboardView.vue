<template>
  <div class="page-container">
    <div class="page-title">Hello, {{ authStore.name }}.</div>
    <div class="content-wrapper flex justify-content-start gap-4">
      <SubscribersOverview />
    </div>
  </div>
</template>

<script setup lang="ts">
import SubscribersOverview from '@/components/home/SubscribersOverview.vue';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useAuthStore } from '@/stores/auth.store';
import '@/styles/BasePage.scss';

const subscriberStore = useSubscriberStore();
subscriberStore.init();

const authStore = useAuthStore();
</script>

<style scoped lang="scss"></style>
