<template>
  <div class="page-container">
    <div class="page-title">{{ $t('home.Dashboard') }}</div>
    <div class="content-wrapper d-flex justify-content-start gap-4">
      <SubscribersOverview/>
      <SubscriberDetails/>
    </div>
    <CopyrightBanner />
  </div>
</template>

<script setup lang="ts">
import CopyrightBanner from "@/components/CopyrightBanner.vue";
import SubscribersOverview from "@/components/SubscribersOverview.vue";
import { useSubscriberStore } from "@/stores/subscriber.store";
import SubscriberDetails from "@/components/SubscriberDetails.vue";

const subscriberStore = useSubscriberStore()
subscriberStore.fetchSubscribers().then(() => {
  subscriberStore.setSelected(subscriberStore.subscribers[0].id)
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
