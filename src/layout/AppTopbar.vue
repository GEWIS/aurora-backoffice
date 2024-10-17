<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
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
import { computed } from 'vue';

const layoutStore = useLayoutStore();
const { darkMode } = storeToRefs(layoutStore);

const logoUrl = computed(() => {
  return `/layout/images/${darkMode.value ? 'helmet-white' : 'helmet-black'}.svg`;
});

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

<style lang="scss" scoped>
@use '@/assets/styles.scss';
</style>
