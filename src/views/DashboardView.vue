<template>
  <div class="page-container">
    <div class="page-title">{{ $t('home.Dashboard') }}</div>
    <div class="content-wrapper">
      <SubscribersOverview/>
    </div>
    <CopyrightBanner />
  </div>
</template>

<script setup lang="ts">
import CopyrightBanner from "@/components/CopyrightBanner.vue";
import SubscribersOverview from "@/components/SubscribersOverview.vue";
import { useSubscriberStore } from "@/stores/subscriber.store";

const subscriberStore = useSubscriberStore()
subscriberStore.fetchSubscribers();

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
