<template>
  <div class="page-container">
    <div class="page-title">{{ $t('home.dashboard') }}</div>
    <div class="content-wrapper flex justify-content-start gap-4">
      <SubscribersOverview/>
      <SubscriberDetails/>
    </div>
    <CopyrightBanner />
  </div>
</template>

<script setup lang="ts">
import CopyrightBanner from "@/layout/CopyrightBanner.vue";
import SubscribersOverview from "@/components/home/SubscribersOverview.vue";
import { useSubscriberStore } from "@/stores/subscriber.store";
import SubscriberDetails from "@/components/home/SubscriberDetails.vue";

const subscriberStore = useSubscriberStore();
subscriberStore.fetchSubscribers().then(() => {
  subscriberStore.setSelected(subscriberStore.subscribers[0].id);
});

</script>

<style scoped lang="scss">
@import "../styles/BasePage.css";

.balance-component {
  margin-right: 15px;
}

.transactions-table {
  margin-left: 15px;
}
</style>
