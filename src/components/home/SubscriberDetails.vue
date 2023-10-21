<template>
  <div>
    <CardComponent :header="header">
      {{selected?.id}}
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSubscriberStore } from "@/stores/subscriber.store";
import CardComponent from "@/layout/CardComponent.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { selected } = storeToRefs(useSubscriberStore());



const header = computed(() => {
  return selected?.value ? `${selected.value.name} ` + t('subscriber.details') : t('subscriber.subscriberDetails');
});
</script>

<style scoped lang="scss">

</style>