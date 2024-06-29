<template>
  <div
    class="layout-wrapper"
    :class="[
      'layout-static',
      { 'layout-static-inactive': !menuDesktopActive, 'layout-mobile-active': menuMobileActive }
    ]"
  >
    <AppTopbar />
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
import { ref, watch } from 'vue';
import { useLayoutStore } from '@/stores/layout.store';
import { storeToRefs } from 'pinia';

const layoutStore = useLayoutStore();
const { menuMobileActive, menuDesktopActive } = storeToRefs(layoutStore);
const outsideClickListener = ref();

watch(menuMobileActive, (active) => {
  if (active) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: Event) => {
      if (isOutsideClicked(event)) {
        menuMobileActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value);
    outsideClickListener.value = null;
  }
};

const isOutsideClicked = (event: Event) => {
  const sidebar = document.querySelector('.layout-sidebar');
  const sidebarButton = document.querySelector('.layout-topbar-button');

  const isInside =
    sidebar!.contains(event.target as Node) || sidebarButton!.contains(event.target as Node);

  return !isInside;
};
</script>

<style scoped></style>
