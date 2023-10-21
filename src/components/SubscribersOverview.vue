<template>
  <div>
    <CardComponent header="Current Subscribers">
      <div v-for="subscriber in subscribers" role="button" class="d-flex flex-row align-items-center my-3">
        <i class="pi pi-desktop fs-2 me-3" style="color: green"/>
        <div class="d-flex flex-column">
          <span class="fw-bold">{{ subscriber.name }}</span>
          <span class="fs-6 opacity-25">{{ subscriber.id }}</span>
        </div>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useSubscriberStore} from "@/stores/subscriber.store";
import CardComponent from "@/components/CardComponent.vue";

const {subscribers} = storeToRefs(useSubscriberStore())
</script>

<style scoped lang="scss">
@import "@/assets/main.css";
</style>