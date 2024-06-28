<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
      <span>Aurora</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="$emit('collapse')">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu">
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
import { ref, computed } from 'vue';
import { usePrimeVue } from 'primevue/config';

const topbarMenuActive = ref(false);
const isLightMode = ref(false);
const $primevue = usePrimeVue();

const logoUrl = computed(() => {
  return `/layout/images/${isLightMode.value ? 'logo-white' : 'logo-dark'}.png`;
});

const onThemeChangeButton = () => {
  let currentTheme = isLightMode.value ? 'aura-dark-blue' : 'aura-light-blue';
  let newTheme = isLightMode.value ? 'aura-light-blue' : 'aura-dark-blue';
  $primevue.changeTheme(currentTheme, newTheme, 'theme-css', () => {});
};

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};
</script>

<style lang="scss" scoped></style>
