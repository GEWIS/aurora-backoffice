<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img src="/layout/images/logo@0.25x.png" alt="logo" />
      <span>Aurora</span>
    </router-link>

    <button class="p-link layout-topbar-button left" @click="switchMenu">
      <i class="pi pi-bars"></i>
    </button>

    <div class="p-link layout-topbar-button right" @click="onThemeChangeButton">
      <i
        :class="[
          'pi',
          {
            'pi-moon': !darkMode,
            'pi-sun': darkMode
          }
        ]"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout.store';
import { storeToRefs } from 'pinia';

const layoutStore = useLayoutStore();
const { darkMode } = storeToRefs(layoutStore);

const switchMenu = () => {
  if (window.innerWidth > 991) {
    layoutStore.switchMenuDesktop();
  } else {
    layoutStore.switchMenuMobile();
  }
};

const onThemeChangeButton = () => {
  layoutStore.switchTheme();
};
</script>

<style lang="scss" scoped></style>
