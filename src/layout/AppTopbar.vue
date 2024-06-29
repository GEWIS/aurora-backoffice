<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img src="/layout/images/logo@0.25x.png" alt="logo" />
      <span>Aurora</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="switchMenu">
      <i class="pi pi-bars"></i>
    </button>

    <div class="p-link layout-topbar-menu-button layout-topbar-button">
      <ToggleButton
        v-model="isLightMode"
        offIcon="pi pi-moon"
        offLabel=""
        onIcon="pi pi-sun"
        onLabel=""
        @click="onThemeChangeButton"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useLayoutStore } from '@/stores/layout.store';

const isLightMode = ref(false);
const $primevue = usePrimeVue();
const layoutStore = useLayoutStore();

const switchMenu = () => {
  if (window.innerWidth > 991) {
    layoutStore.switchMenuDesktop();
  } else {
    layoutStore.switchMenuMobile();
  }
};

const onThemeChangeButton = () => {
  let currentTheme = isLightMode.value ? 'aura-dark-blue' : 'aura-light-blue';
  let newTheme = isLightMode.value ? 'aura-light-blue' : 'aura-dark-blue';
  $primevue.changeTheme(currentTheme, newTheme, 'theme-css', () => {});
};
</script>

<style lang="scss" scoped></style>
