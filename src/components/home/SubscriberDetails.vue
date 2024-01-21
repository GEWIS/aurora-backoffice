<template>
  <div>
    <CardComponent :header="header">
      {{ selected?.id }}
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber.store';
import CardComponent from '@/layout/CardComponent.vue';
import { computed } from 'vue';

const { selected } = storeToRefs(useSubscriberStore());

const header = computed(() => {
  return selected?.value ? `${selected.value.name} Details` : 'Subscriber details';
});
</script>

<style scoped lang="scss"></style>
