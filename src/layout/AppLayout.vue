<template>
  <div class="layout-wrapper" :class="['layout-static', { 'layout-static-inactive': collapsed }]">
    <AppTopbar @collapse="switchCollapsed" />
    <div class="layout-sidebar">
      <AppMenu />
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <RouterView />
      </div>
    </div>
    <div class="layout-mask"></div>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import AppTopbar from '@/layout/AppTopbar.vue';
import Toast from 'primevue/toast';
import { RouterView } from 'vue-router';
import AppMenu from '@/layout/AppMenu.vue';
import { ref } from 'vue';

const collapsed = ref(false);
const switchCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style scoped></style>
